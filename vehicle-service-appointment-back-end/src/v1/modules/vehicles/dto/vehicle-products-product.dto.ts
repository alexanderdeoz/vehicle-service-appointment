import { IsOptional } from 'class-validator';
import { CreateProductDto } from '@v1/modules/products/dto';
import { CreateVehicleDto } from '@v1/modules/vehicles/dto/create-vehicle.dto';
import { CreateAppointmentDto } from '@v1/modules/appointments/dto';

export class VehicleProductsProductDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  updated_at?: Date;

  @IsOptional()
  deleted_at?: Date;

  @IsOptional()
  created_at?: Date;

  @IsOptional()
  child_id?: number;

  @IsOptional()
  repair?: boolean;

  @IsOptional()
  vehicle_id?: number;

  @IsOptional()
  product_id?: number;

  @IsOptional()
  appointment_id?: number;

  @IsOptional()
  appointment?: CreateAppointmentDto;

  @IsOptional()
  vehicle?: CreateVehicleDto;

  @IsOptional()
  product?: CreateProductDto;

  @IsOptional()
  child?: VehicleProductsProductDto;

  constructor(opts: Partial<VehicleProductsProductDto>) {
    this.id = opts?.id;
    this.updated_at = opts?.updated_at;
    this.deleted_at = opts?.deleted_at;
    this.created_at = opts?.created_at;
    this.child_id = opts?.child_id;
    this.repair = opts?.repair;
    this.appointment_id = opts?.appointment_id;
    this.vehicle_id = opts?.vehicle_id;
    this.product_id = opts?.product_id;
    this.appointment = opts?.appointment;
    this.vehicle = opts?.vehicle;
    this.product = opts?.product;
  }
}
