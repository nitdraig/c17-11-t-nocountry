import { IsPassword } from '@Decorators/password.decorator';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateUserDTO {
  @IsOptional()
  @IsString()
  role?: string;

  @IsArray()
  @IsOptional()
  pet?: string[];

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsOptional()
  @IsNumber()
  @Min(7)
  @Max(8)
  dni?: number;

  @IsOptional()
  birthday?: Date;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsArray()
  @IsOptional()
  @MaxLength(10, {
    each: true,
  })
  phone?: string[];

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  email_verified?: boolean;

  @IsOptional()
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsPassword({
    message:
      'The password does not meet any of these, at least one uppercase letter, at least one lowercase letter, at least one number or at least one of the following special characters @; :-_/',
  })
  password?: string;

  @ValidateNested()
  @IsOptional()
  address?: Address[];

  // @IsBoolean()
  // @IsOptional()
  blocking?: boolean;
}

export class UpdateUserDTO {
  role?: string;

  @IsArray()
  @IsOptional()
  pet?: string[];

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsNumber()
  @IsOptional()
  @Min(7)
  @Max(8)
  dni?: number;

  @IsDate()
  @IsOptional()
  birthday?: Date;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsOptional()
  @MinLength(10, {
    each: true,
  })
  @MaxLength(10, {
    each: true,
  })
  phone?: string[];

  @IsString()
  @IsOptional()
  email?: string;
  email_verified?: boolean;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  @IsPassword({
    message:
      'The password does not meet any of these, at least one uppercase letter, at least one lowercase letter, at least one number or at least one of the following special characters @; :-_/',
  })
  password?: string;

  @IsOptional()
  @IsString()
  current_password?: string;

  @ValidateNested()
  @IsOptional()
  address?: Address[];

  blocking?: boolean;
}

export class BlockUserDTO {
  @IsBoolean()
  blocking: boolean;
}

class Address {
  @IsString()
  city: string;

  @IsString()
  address: string;
}
