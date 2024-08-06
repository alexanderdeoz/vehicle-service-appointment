import { IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class ModelDto {
  @IsOptional()
  id?: number;

  constructor(opts?: PartialType<ModelDto>) {
    this.id = opts?.id;
  }
}
