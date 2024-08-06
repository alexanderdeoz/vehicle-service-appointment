import { IsNumber, IsOptional, IsString } from 'class-validator';
import { VehicleProductsProductDto } from '@v1/modules/vehicles/dto';

export class CreateProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  sale_price: number;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  vehicleProductsProduct?: VehicleProductsProductDto;
}
