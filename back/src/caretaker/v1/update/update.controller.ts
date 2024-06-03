import { CaretakerService } from '@Caretaker/caretaker.service';
import { UpdateCaretakerDTO } from '@Caretaker/dto/caretaker.dto';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Patch,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.CARETAKER,
})
export class UpdateController {
  constructor(private caretakerService: CaretakerService) {}

  @Roles('caretaker')
  @Patch()
  async updateCaretaker(@Body() data: UpdateCaretakerDTO, @Req() req: Request) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user, active_requests, blocking, ...body } = data;

      const caretaker = await this.caretakerService.update(
        req.user['userId'],
        body,
      );

      if (caretaker == null) throw new Error('null');

      return {
        success: true,
        data: caretaker,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'null') {
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
