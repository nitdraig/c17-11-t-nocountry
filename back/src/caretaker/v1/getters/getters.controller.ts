import { CaretakerService } from '@Caretaker/caretaker.service';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Public } from '@Decorators/public-access.decorator';
import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.CARETAKER,
})
export class GettersController {
  constructor(private caretakerService: CaretakerService) {}

  @Public()
  @Get()
  async getAll() {
    try {
      const caretakers = await this.caretakerService.findAll();

      return {
        success: true,
        data: caretakers,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: String(error),
      });
    }
  }

  @Public()
  @Get('p')
  async getAllPaginate(@Query('page') p: string, @Query('limit') l: string) {
    const page = p == undefined ? 1 : Number(p);
    const limit = l == undefined ? 10 : Number(l);

    try {
      const caretakers = await this.caretakerService.findAllPaginate(
        page,
        limit,
      );

      return {
        success: true,
        data: caretakers,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: String(error),
      });
    }
  }

  @Public()
  @Get(':id')
  async getOneById(@Param('id') id: string) {
    try {
      const caretaker = await this.caretakerService.findById(id);
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
            message: 'Caretaker not found',
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
