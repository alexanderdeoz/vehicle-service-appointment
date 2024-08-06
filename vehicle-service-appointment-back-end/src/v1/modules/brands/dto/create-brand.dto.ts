import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BrandStatus } from '@v1/modules/brands/enums';

export class CreateBrandDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  status?: BrandStatus;
}
