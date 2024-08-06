import { IsNumber, IsOptional, IsString } from 'class-validator';
import { FuelStatus } from '@v1/modules/fuels/enums';

export class CreateFuelDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  status?: FuelStatus;
}
