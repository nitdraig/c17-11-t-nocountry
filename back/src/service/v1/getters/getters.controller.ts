import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Public } from '@Decorators/public-access.decorator';
import { ServiceService } from '@Service/service.service';
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
  path: PRINCIPAL_PATHS.SERVICE,
})
export class GettersController {
  constructor(private serviceService: ServiceService) {}

  @Public()
  @Get()
  async getAll() {
    try {
      const services = await this.serviceService.findAll();
      return {
        success: true,
        data: services,
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
      const services = await this.serviceService.findAllPaginate(page, limit);

      return {
        success: true,
        data: services,
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
      const service = await this.serviceService.findById(id);
      if (service == null) throw new Error('null');

      return {
        success: true,
        data: service,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'null') {
          throw new NotFoundException({
            success: false,
            message: 'Service Not Found',
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
