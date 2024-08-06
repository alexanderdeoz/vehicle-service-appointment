import { IsNumber, IsOptional } from 'class-validator';
import { UserDto } from '@v1/modules/users/dto/user.dto';
import { PermissionDto } from '@v1/modules/users/dto/permission.dto';
import { EntityFromSystemDto } from '@v1/modules/users/dto/entity-from-system.dto';

export class UserPermissionsDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsOptional()
  user?: UserDto;

  @IsOptional()
  permission?: PermissionDto;

  @IsOptional()
  entity_from_system?: EntityFromSystemDto;
}
