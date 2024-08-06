import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AppointmentVehicleDto } from '@v1/modules/appointments/dto/appointment-vehicle.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { VehicleProductsProductDto } from '@v1/modules/vehicles/dto';

export class CreateAppointmentDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  status: string;

  @ApiProperty()
  @IsNotEmpty()
  scheduled_at: string;

  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  valid_until_at: string;

  @IsString()
  reason: string;

  @Type(() => AppointmentVehicleDto)
  @ValidateNested({ each: true })
  appointmentVehicle: AppointmentVehicleDto[];

  @Type(() => VehicleProductsProductDto)
  @ValidateNested({ each: true })
  appointmentProducts: VehicleProductsProductDto[];
}
