import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateVehicleDto } from '@v1/modules/vehicles/dto';
import { Type } from 'class-transformer';

export class AppointmentVehicleDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  damage_percentage: string;

  @IsOptional()
  @IsString()
  type_service: string;

  @IsOptional()
  @IsString()
  status_service: string;

  @IsOptional()
  @IsNumber()
  appointment_id: number;

  @IsOptional()
  @IsNumber()
  vehicle_id: number;

  @IsOptional()
  @Type(() => CreateVehicleDto)
  vehicle: CreateVehicleDto;
}
