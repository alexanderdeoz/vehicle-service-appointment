import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ModelStatus } from '@v1/modules/models/enums';

export class CreateModelDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  status?: ModelStatus;
}
