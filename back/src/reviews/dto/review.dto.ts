import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class AddReviewDTO {
  @IsString()
  @Length(24, 24)
  @IsNotEmpty()
  caretaker: string;

  client: string;

  @IsString()
  @MaxLength(1000)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  stars: number;
}

export class UpdateReviewDTO {
  @IsOptional()
  @IsString()
  @Length(24, 24)
  caretaker?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  stars?: number;

  updateAt: Date;
}
