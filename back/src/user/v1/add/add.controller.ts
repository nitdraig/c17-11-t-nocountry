import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import { RoleService } from '@Role/role.service';
import { CreateUserDTO } from '@User/dto/user.dto';
import { UserService } from '@User/user.service';
import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.USER,
})
export class AddController {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  @Roles('admin')
  @Post('create')
  async AddUser(@Body() data: CreateUserDTO) {
    try {
      const { role, first_name, last_name, email, password } = data;
      const foundRole = await this.roleService.findById(role);
      if (foundRole == null) throw new Error('null');

      const userCreated = await this.userService.create({
        role,
        first_name,
        last_name,
        email,
        email_verified: true,
        blocking: false,
        password,
        username:
          first_name.trim().replace(/\s+/g, '') +
          new Date().valueOf().toString(),
      });

      userCreated.password = '';

      return {
        success: true,
        data: userCreated,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'null') {
          throw new BadRequestException({
            success: false,
            message: 'Role invalid',
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
