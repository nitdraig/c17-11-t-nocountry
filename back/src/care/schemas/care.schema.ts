import { Caretaker } from '@Caretaker/schemas/caretaker.schema';
import { Pet } from '@Pet/schemas/pet.schema';
import { Service } from '@Service/schemas/service.schema';
import { User } from '@User/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CareDocument = HydratedDocument<Care>;

@Schema()
export class Care {
  @Prop({ type: Types.ObjectId, ref: 'Caretaker' })
  caretaker: Caretaker;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Service' }] })
  services: Service[];

  @Prop({ type: Types.ObjectId, ref: 'Pet' })
  pet: Pet;

  @Prop()
  date: Date;

  @Prop()
  hours: number;

  @Prop()
  status: string;

  @Prop()
  state: boolean;

  @Prop()
  description: string;

  @Prop()
  totalPrice: number;
}

export const CareSchema = SchemaFactory.createForClass(Care);
