import { PRINCIPAL_PATHS } from '@Constants/routes';
import { CareService } from '@Care/care.service';
import {
  Controller,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { Roles } from '@Decorators/role.decorator';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.CARE,
})
export class DeleteController {
  constructor(private readonly careService: CareService) {}

  @Roles('admin')
  @Delete(':id')
  async deleteCare(@Param('id') careId: string) {
    try {
      const deleteCare = await this.careService.delete(careId);
      if (deleteCare == null) throw new Error('null');

      return {
        success: true,
        message: 'Care deleted successfully',
        data: deleteCare,
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
