import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { PaymentService } from './payment.service';
import { AddController } from './v1/add/add.controller';
import { GettersController } from './v1/getters/getters.controller';
import { UpdateController } from './v1/update/update.controller';
import { MongooseService } from '@Helpers/mongoose/mongoose.service';
import { CareModule } from '@Care/care.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    CareModule,
  ],
  providers: [PaymentService, MongooseService],
  controllers: [AddController, GettersController, UpdateController],
})
export class PaymentModule {}
