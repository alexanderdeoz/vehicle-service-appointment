import { IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { ModelDto } from '@v1/modules/vehicles/dto/model.dto';
import { BrandDto } from '@v1/modules/vehicles/dto/brand.dto';
import { FuelDto } from '@v1/modules/vehicles/dto/fuel.dto';

export class CreateVehicleDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  updated_at?: string;

  @IsOptional()
  deleted_at?: string;

  @IsOptional()
  created_at?: string;

  @IsOptional()
  plate?: string;

  @IsOptional()
  model?: ModelDto;

  @IsOptional()
  brand?: BrandDto;

  @IsOptional()
  fuel?: FuelDto;

  @IsOptional()
  mileage?: number;

  @IsOptional()
  status?: string;

  @IsOptional()
  made_in?: string;

  @IsOptional()
  warranty_up_to?: string;

  @IsOptional()
  next_review_at?: string;

  constructor(opts?: PartialType<CreateVehicleDto>) {
    this.id = opts?.id;
    this.updated_at = opts?.updated_at;
    this.deleted_at = opts?.deleted_at;
    this.created_at = opts?.created_at;
    this.plate = opts?.plate;
    this.type = opts?.type;
    this.model = opts?.fuel;
    this.mileage = opts?.mileage;
    this.status = opts?.status;
    this.made_in = opts?.made_in;
    this.warranty_up_to = opts?.warranty_up_to;
    this.next_review_at = opts?.next_review_at;
  }
}
