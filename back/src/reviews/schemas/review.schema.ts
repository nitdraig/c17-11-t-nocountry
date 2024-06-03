import { Caretaker } from '@Caretaker/schemas/caretaker.schema';
import { User } from '@User/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review {
  @Prop({ type: Types.ObjectId, ref: 'Caretaker' })
  caretaker: Caretaker;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  client: User;

  @Prop()
  description: string;

  @Prop()
  stars: number;

  @Prop({ default: new Date() })
  createAt: Date;

  @Prop()
  updateAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
