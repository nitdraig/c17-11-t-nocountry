import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDTO {
  @IsString()
  @IsNotEmpty()
  care: string;

  amount: number;

  date?: Date;

  payment_date?: Date;

  @IsString()
  @IsNotEmpty()
  status: string;
}

export class UpdatePaymentDTO {
  @IsString()
  @IsOptional()
  care?: string;

  payment_date?: Date;

  @IsString()
  @IsOptional()
  status?: string;
}
