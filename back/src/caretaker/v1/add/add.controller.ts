import { CaretakerService } from '@Caretaker/caretaker.service';
import { CreateCaretakerDTO } from '@Caretaker/dto/caretaker.dto';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { RoleService } from '@Role/role.service';
import { UserService } from '@User/user.service';
import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.CARETAKER,
})
export class AddController {
  constructor(
    private caretakerService: CaretakerService,
    private roleService: RoleService,
    private userService: UserService,
  ) {}

  @Post()
  async addCaretaker(@Body() data: CreateCaretakerDTO, @Req() req: Request) {
    let userId: string;
    const roleId = req.user['roleId'];
    const { user, ...body } = data;

    try {
      const role = await this.roleService.findById(roleId);
      if ((!user && role.name != 'admin') || (user && role.name != 'admin')) {
        userId = req.user['userId'];
      } else if (user && role.name == 'admin') {
        userId = user;
      } else {
        throw new Error('no_user');
      }
      const caretakerRole = await this.roleService.findOneByName('caretaker');

      const caretaker = await this.caretakerService.create({
        user: userId,
        ...body,
      });

      await this.userService.update(userId, {
        role: caretakerRole._id.toString(),
      });

      return {
        success: true,
        data: caretaker,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'no_user') {
          throw new BadRequestException({
            success: false,
            message: 'User not provided',
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
