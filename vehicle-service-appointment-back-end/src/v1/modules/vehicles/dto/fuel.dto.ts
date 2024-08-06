import { IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class FuelDto {
  @IsOptional()
  id?: number;

  constructor(opts?: PartialType<FuelDto>) {
    this.id = opts?.id;
  }
}
