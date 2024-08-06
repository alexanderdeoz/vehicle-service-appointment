import { Controller, Get, Query } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { ApiTags } from '@nestjs/swagger';
import { AppRoute, Version } from '@v1/shared/enum';
import { AuthHttp } from '@v1/shared/decorators';
import { FindAllPermissionsByRoleDto } from '@v1/modules/roles/dto';
import { Role } from '@v1/modules/roles/entities';

@AuthHttp()
@ApiTags(AppRoute.roles)
@Controller({
  path: AppRoute.roles,
  version: Version.V1,
})
export class RolePermissionsController {
  constructor(private readonly rolesService: RolesService) {}

  @Get('role-permissions')
  async findAll(@Query('rol_ids') params: FindAllPermissionsByRoleDto<Role>) {
    return await this.rolesService.findAllPermissionsByRole(params);
  }
}
