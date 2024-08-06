import { IsString, ValidateNested } from 'class-validator';
import { RolesDto } from '@v1/modules/users/dto/roles.dto';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  address: string;

  @IsString()
  birth_date: string;

  @IsString()
  email: string;

  @IsString()
  identification: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @Type(() => RolesDto)
  @ValidateNested({ each: true })
  roles: RolesDto[];

  @IsString()
  status: string;
}
