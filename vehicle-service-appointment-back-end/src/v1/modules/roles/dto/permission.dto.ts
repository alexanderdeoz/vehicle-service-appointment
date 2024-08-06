import { IsNumber } from 'class-validator';

export class PermissionDto {
  @IsNumber()
  id: number;
}
