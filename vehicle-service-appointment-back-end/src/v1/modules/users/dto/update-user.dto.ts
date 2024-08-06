import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RolesDto } from '@v1/modules/users/dto/roles.dto';
import { UserPermissionsDto } from '@v1/modules/users/dto/user-permissions.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  birth_date: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  identification: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @Type(() => RolesDto)
  @ValidateNested({ each: true })
  roles: RolesDto[];

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @Type(() => UserPermissionsDto)
  @ValidateNested({ each: true })
  user_permissions: UserPermissionsDto[];
}
