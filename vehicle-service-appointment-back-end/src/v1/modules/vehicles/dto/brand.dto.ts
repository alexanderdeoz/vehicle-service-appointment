import { IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class BrandDto {
  @IsOptional()
  id?: number;

  constructor(opts?: PartialType<BrandDto>) {
    this.id = opts?.id;
  }
}
