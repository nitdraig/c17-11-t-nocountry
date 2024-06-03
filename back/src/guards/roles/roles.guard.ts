import { RoleService } from '@Role/role.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private roleService: RoleService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get('roles', context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const roleId = request.user['roleId'];
    const result = await this.matchRole(roles, roleId);

    request.user['roleName'] = result.success ? result.roleName : '';
    return result.success;
  }

  private async matchRole(
    role: string[],
    roleId: string,
  ): Promise<{
    success: boolean;
    roleName?: string;
  }> {
    try {
      const rol = await this.roleService.findById(roleId);

      if (role.includes(rol.name)) {
        return {
          success: true,
          roleName: rol.name,
        };
      } else {
        return {
          success: false,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: String(error),
      });
    }
  }
}
