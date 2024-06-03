import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import { BlockUserDTO, UpdateUserDTO } from '@User/dto/user.dto';
import { UserService } from '@User/user.service';
import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.USER,
})
export class UpdateController {
  constructor(private userService: UserService) {}

  @Patch()
  async updateUser(@Body() data: UpdateUserDTO, @Req() req: Request) {
    try {
      const user = await this.userService.update(req.user['userId'], data);
      user.password = '';

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

  @Roles('admin')
  @Patch('block/:id')
  async blockUser(@Param('id') id: string, @Body() data: BlockUserDTO) {
    try {
      const user = await this.userService.update(id, data);

      if (user == null) throw new Error('null');
      return {
        success: true,
        data: user,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'null') {
          throw new NotFoundException({
            success: false,
            message: 'User not found',
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
