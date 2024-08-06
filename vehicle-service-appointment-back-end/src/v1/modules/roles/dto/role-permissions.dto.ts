import { IsNumber, IsOptional } from 'class-validator';
import { PermissionDto } from '@v1/modules/roles/dto/permission.dto';
import { RoleDto } from '@v1/modules/roles/dto/role.dto';
import { EntityFromSystemDto } from '@v1/modules/roles/dto/entity-from-system.dto';

export class RolePermissionsDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsOptional()
  role?: RoleDto;

  @IsOptional()
  permission?: PermissionDto;

  @IsOptional()
  entity_from_system?: EntityFromSystemDto;
}
