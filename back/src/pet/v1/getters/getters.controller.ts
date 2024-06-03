import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { PRINCIPAL_PATHS } from '@Constants/routes';
import { PetService } from '@Pet/pet.service';
import { Public } from '@Decorators/public-access.decorator';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.PET,
})
export class GettersController {
  constructor(private petService: PetService) {}

  @Public()
  @Get()
  async getAll() {
    try {
      const pets = await this.petService.findAll();
      return {
        success: true,
        data: pets,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: String(error),
      });
    }
  }

  @Public()
  @Get('p')
  async getAllPaginate(@Query('page') p: string, @Query('limit') l: string) {
    const page = p == undefined ? 1 : Number(p);
    const limit = l == undefined ? 10 : Number(l);

    try {
      const pets = await this.petService.findAllPaginate(page, limit);

      return {
        success: true,
        data: pets,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: String(error),
      });
    }
  }

  @Public()
  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const pet = await this.petService.findById(id);
      if (pet == null) throw new Error('null');

      return {
        success: true,
        data: pet,
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
