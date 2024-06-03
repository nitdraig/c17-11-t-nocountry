import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Roles } from '@Decorators/role.decorator';
import { PetService } from '@Pet/pet.service';
import {
  Controller,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.PET,
})
export class DeleteController {
  constructor(private readonly petService: PetService) {}

  @Roles('admin')
  @Delete(':id')
  async deletePet(@Param('id') petId: string) {
    try {
      const deletedPet = await this.petService.delete(petId);
      if (deletedPet == null) throw new Error('null');

      return {
        success: true,
        message: 'Pet deleted successfully',
        data: deletedPet,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == 'null') {
          throw new NotFoundException({
            success: false,
            message: 'Pet not found',
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
