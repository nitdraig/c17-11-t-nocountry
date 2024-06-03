import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import { CreatePetDTO } from '@Pet/dto/pet.dto';
import { PetService } from '@Pet/pet.service';

import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.PET,
})
export class AddController {
  constructor(private petService: PetService) {}
  @Roles('admin')
  @Post()
  async addPet(@Body() data: CreatePetDTO) {
    try {
      const pet = await this.petService.create(data);
      return {
        success: true,
        data: pet,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'no_user') {
          throw new BadRequestException({
            success: false,
            message: 'User not provided',
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
