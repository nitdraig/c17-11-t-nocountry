import { Care } from '@Care/schemas/care.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  @Prop({ type: Types.ObjectId, ref: 'Care' })
  care: Care;

  @Prop()
  amount: number;

  @Prop()
  date: Date;

  @Prop()
  payment_date: Date;

  @Prop()
  status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
