import { RoleDto } from '@v1/modules/users/dto/role.dto';
import { UserDto } from '@v1/modules/users/dto/user.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class RolesDto {
  @IsNotEmpty()
  @Type(() => RoleDto)
  role?: RoleDto;

  @IsOptional()
  @Type(() => UserDto)
  user?: UserDto;
}
