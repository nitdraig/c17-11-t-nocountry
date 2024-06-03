import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import { CreatePaymentDTO } from '@Payment/dto/payment.dto';
import { PaymentService } from '@Payment/payment.service';
import { CareService } from '@Care/care.service';
import {
  Body,
  Controller,
  Post,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.PAYMENT,
})
export class AddController {
  constructor(
    private paymentService: PaymentService,
    private readonly careService: CareService,
  ) {}

  @Roles('admin')
  @Post()
  async addPayment(@Body() data: CreatePaymentDTO) {
    const { ...body } = data;

    const care = await this.careService.findById(body.care);

    if (isNaN(care.totalPrice) && care.totalPrice == null)
      throw new Error('Invalid_Amount');

    if (
      body.status.toLowerCase() != 'pagado' &&
      body.status.toLowerCase() != 'pendiente'
    ) {
      throw new Error('Invalid_status');
    }
    if (body.status.toLowerCase() == 'pagado') body.payment_date = new Date();

    body.status = body.status.toLowerCase();

    try {
      const payment = await this.paymentService.create({
        amount: care.totalPrice,
        ...body,
        date: new Date(),
      });

      return {
        success: true,
        data: payment,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'Invalid_status') {
          throw new BadRequestException({
            success: false,
            message: 'Invalid Status',
          });
        }
        if (error.message == 'Invalid_Amount') {
          throw new BadRequestException({
            success: false,
            message: 'Invalid Amount',
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
