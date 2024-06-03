import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import { UpdateServiceDTO } from '@Service/dto/service.dto';
import { ServiceService } from '@Service/service.service';
import {
  Body,
  Controller,
  Patch,
  Param,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.SERVICE,
})
export class UpdateController {
  constructor(private serviceService: ServiceService) {}

  @Roles('admin')
  @Patch(':id')
  async updateService(
    @Param('id') serviceId: string,
    @Body() data: UpdateServiceDTO,
  ) {
    try {
      const { ...body } = data;

      const updatedService = await this.serviceService.update(serviceId, body);

      if (updatedService == null) throw new Error('null');
      return {
        success: true,
        data: updatedService,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'null') {
          throw new NotFoundException({
            success: false,
            message: 'Service not provided',
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
