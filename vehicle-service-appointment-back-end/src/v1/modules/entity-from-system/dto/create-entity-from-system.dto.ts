import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RoleType } from '@v1/modules/roles/enum';
import { EntityType } from '@v1/modules/entity-from-system/enum';
import { EntityFromSystemPermissionDto } from '@v1/modules/entity-from-system/dto/entity-from-system-permission.dto';
import { Type } from 'class-transformer';

export class CreateEntityFromSystemDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  name?: RoleType;

  @IsOptional()
  @IsString()
  status?: EntityType;

  @Type(() => EntityFromSystemPermissionDto)
  @ValidateNested({ each: true })
  entityFromSystemPermission?: EntityFromSystemPermissionDto[];
}
