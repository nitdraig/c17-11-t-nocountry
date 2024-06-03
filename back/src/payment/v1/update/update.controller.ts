import { PRINCIPAL_PATHS } from '@Constants/routes';
import { UpdatePaymentDTO } from '@Payment/dto/payment.dto';
import { Roles } from '@Decorators/role.decorator';
import { PaymentService } from '@Payment/payment.service';
import {
  Body,
  Controller,
  InternalServerErrorException,
  BadRequestException,
  Param,
  Patch,
} from '@nestjs/common';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.PAYMENT,
})
export class UpdateController {
  constructor(private paymentService: PaymentService) {}

  @Roles('admin')
  @Patch(':id')
  async updatePayment(
    @Param('id') paymentId: string,
    @Body() data: UpdatePaymentDTO,
  ) {
    try {
      const { ...body } = data;

      if (
        body.status != undefined &&
        body.status.toLowerCase() != 'pagado' &&
        body.status.toLowerCase() != 'pendiente'
      ) {
        throw new Error('Invalid_status');
      }

      if (body.status && body.status.toLowerCase() == 'pagado')
        body.payment_date = new Date();
      else if (body.status) body.status = body.status.toLowerCase();

      const updatedPayment = await this.paymentService.update(paymentId, body);

      if (updatedPayment == null) throw new Error('null');
      return {
        success: true,
        data: updatedPayment,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'Invalid_status') {
          throw new BadRequestException({
            success: false,
            message: 'Invalid Status!',
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
