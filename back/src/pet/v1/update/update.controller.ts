import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { PetService } from '@Pet/pet.service';
import { UpdatePetDTO } from '@Pet/dto/pet.dto';

import { Roles } from '@Decorators/role.decorator';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.PET,
})
export class UpdateController {
  constructor(private readonly petService: PetService) {}

  @Roles('admin')
  @Patch(':id')
  async updatePet(@Param('id') petId: string, @Body() data: UpdatePetDTO) {
    try {
      const updatedPet = await this.petService.update(petId, data);
      if (updatedPet == null) throw new Error('null');

      return {
        success: true,
        data: updatedPet,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'null') {
          throw new NotFoundException({
            success: false,
            message: 'User not found',
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
