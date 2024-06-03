import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import { PaymentService } from '@Payment/payment.service';
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
  path: PRINCIPAL_PATHS.PAYMENT,
})
export class GettersController {
  constructor(private paymentService: PaymentService) {}

  @Roles('admin')
  @Get()
  async getAll() {
    try {
      const payments = await this.paymentService.findAll();
      return {
        sucess: true,
        data: payments,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: String(error),
      });
    }
  }

  @Roles('admin')
  @Get('p')
  async getAllPaginate(@Query('page') p: string, @Query('limit') l: string) {
    const page = p == undefined ? 1 : Number(p);
    const limit = l == undefined ? 10 : Number(l);
    try {
      const services = await this.paymentService.findAllPaginate(page, limit);

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

  @Roles('admin')
  @Get(':id')
  async getOneById(@Param('id') id: string) {
    try {
      const payment = await this.paymentService.findById(id);
      if (payment == null) throw new Error('null');

      return {
        success: true,
        data: payment,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'null') {
          throw new NotFoundException({
            success: false,
            message: 'Payment Not Found',
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
