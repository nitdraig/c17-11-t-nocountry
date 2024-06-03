import { PRINCIPAL_PATHS } from '@Constants/routes';
import { Public } from '@Decorators/public-access.decorator';
import { Roles } from '@Decorators/role.decorator';
import { RoleService } from '@Role/role.service';
import { Controller, Get, InternalServerErrorException } from '@nestjs/common';

@Controller({
  version: '1',
  path: PRINCIPAL_PATHS.ROLE,
})
export class GettersController {
  constructor(private roleService: RoleService) {}

  @Public()
  @Get()
  async getAllPublic() {
    try {
      const roles = await this.roleService.findAll({ name: { $ne: 'admin' } });

      return {
        success: true,
        data: roles,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: String(error),
      });
    }
  }

  @Roles('admin')
  @Get('private')
  async getAllPrivate() {
    try {
      const roles = await this.roleService.findAll();

      return {
        success: true,
        data: roles,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: String(error),
      });
    }
  }
}
