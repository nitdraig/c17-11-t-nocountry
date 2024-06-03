import { IsString, Length } from 'class-validator';

export class CreatePetDTO {
  @IsString()
  @Length(2, 50, { message: 'Name must be between 2 and 50 characters long' })
  readonly name: string;
}

export class UpdatePetDTO {
  @IsString()
  @Length(2, 50, { message: 'Name must be between 2 and 50 characters long' })
  readonly name?: string;
}
