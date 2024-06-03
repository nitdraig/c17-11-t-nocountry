import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Public } from '@Decorators/public-access.decorator';
import { GetHtmlService } from '@Helpers/get-html/get-html.service';
import { MailService } from '@Helpers/mail/mail.service';
import { PasswordService } from '@Helpers/password/password.service';
import { UserService } from '@User/user.service';
import {
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  PreconditionFailedException,
} from '@nestjs/common';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.AUTH,
})
export class ResetPasswordController {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private getHtmlService: GetHtmlService,
    private mailService: MailService,
  ) {}
  @Public()
  @Get('reset-password/:username')
  async resetPassword(@Param('username') username: string) {
    try {
      const user = await this.userService.findUserByUsernameOrEmail(username);
      if (!user) throw new Error('null');
      if (!user.email_verified) throw new Error('no_verified');
      if (user.blocking) throw new Error('blocked');

      const newPass = this.passwordService.generateRandom();

      //* Update password
      await this.userService.update(
        user._id.toString(),
        {
          password: newPass,
        },
        true,
      );

      //* Send email
      const body = await this.getHtmlService.get('reset-password', 'es', {
        pass: newPass,
      });

      await this.mailService.send(user.email, 'Reset password', body);

      return {
        success: true,
        message: 'New password generated, check your email',
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'null') {
          throw new NotFoundException({
            success: false,
            message: 'User not found',
          });
        }

        if (error.message == 'no_verified') {
          throw new PreconditionFailedException({
            success: false,
            message: 'Email not verified',
          });
        }

        if (error.message == 'blocked') {
          throw new ForbiddenException({
            success: false,
            message: 'User blocked',
          });
        }
      }
      throw new InternalServerErrorException({
        success: false,
        message: String(error),
      });
    }
  }
}
