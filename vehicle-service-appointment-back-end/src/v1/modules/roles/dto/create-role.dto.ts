import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RoleStatus, RoleType } from '@v1/modules/roles/enum';
import { Type } from 'class-transformer';
import { RolePermissionsDto } from '@v1/modules/roles/dto/role-permissions.dto';

export class CreateRoleDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  name?: RoleType;

  @IsOptional()
  @IsString()
  status?: RoleStatus;

  @IsOptional()
  @Type(() => RolePermissionsDto)
  @ValidateNested({ each: true })
  role_permissions: RolePermissionsDto[];
}
