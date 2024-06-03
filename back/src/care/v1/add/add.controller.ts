import { CareService } from '@Care/care.service';
import { CreateCareDTO } from '@Care/dto/care.dto';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
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
  path: PRINCIPAL_PATHS.CARE,
})
export class AddController {
  constructor(private careService: CareService) {}

  @Roles('owner')
  @Post()
  async addCare(@Body() data: CreateCareDTO, @Req() req: Request) {
    try {
      const userId: string = req.user['userId'];
      const care = await this.careService.create(data, userId);

      return {
        success: true,
        data: care,
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
