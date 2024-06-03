import { PRINCIPAL_PATHS } from '@Constants/routes';
import { UserService } from '@User/user.service';
import {
  Controller,
  Delete,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.USER,
})
export class DeleteController {
  constructor(private userService: UserService) {}

  @Delete()
  async deleteUser(@Req() req: Request) {
    try {
      const user = await this.userService.delete(req.user['userId']);

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: String(error),
      });
    }
  }
}
