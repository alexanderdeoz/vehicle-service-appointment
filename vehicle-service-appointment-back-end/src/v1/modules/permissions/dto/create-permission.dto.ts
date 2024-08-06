import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PermissionStatus, PermissionType } from '@v1/modules/permissions/enum';

export class CreatePermissionDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  name?: PermissionType;

  @IsOptional()
  @IsString()
  status?: PermissionStatus;
}
