import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCaretakerDTO {
  @IsString()
  @IsOptional()
  user: string;

  @IsString({ each: true })
  @IsNotEmpty()
  @MinLength(24, { each: true })
  @MaxLength(24, { each: true })
  services: string[];

  @IsString({ each: true })
  @IsNotEmpty()
  @MinLength(24, { each: true })
  @MaxLength(24, { each: true })
  pets: string[];

  active_requests: number;

  @IsString()
  description: string;
}

export class UpdateCaretakerDTO {
  user?: string;

  @IsString({ each: true })
  @IsOptional()
  services?: string[];

  @IsString({ each: true })
  @IsOptional()
  pets?: string[];

  active_requests?: number;

  @IsString()
  @IsOptional()
  description?: string;

  blocking?: boolean;

  @IsBoolean()
  @IsOptional()
  enable?: boolean;

  sumPoint?: number;
  stars?: number;
  reviews?: number;
}
