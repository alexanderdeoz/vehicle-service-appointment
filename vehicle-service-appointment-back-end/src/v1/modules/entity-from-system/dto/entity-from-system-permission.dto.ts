import { IsNumber, IsOptional } from 'class-validator';
import { PermissionDto } from '@v1/modules/entity-from-system/dto/permission.dto';
import { EntityFromSystemDto } from '@v1/modules/entity-from-system/dto/entity-from-system.dto';

export class EntityFromSystemPermissionDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  entityFromSystem?: EntityFromSystemDto;

  @IsOptional()
  permission?: PermissionDto;
}
