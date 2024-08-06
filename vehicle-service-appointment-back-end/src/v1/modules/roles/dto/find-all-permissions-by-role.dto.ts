import { PaginationDto } from '@v1/shared/dto';
import { ArrayMinSize, IsArray, IsOptional } from 'class-validator';

export class FindAllPermissionsByRoleDto<E> extends PaginationDto<E> {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  rol_ids: number[];
}
