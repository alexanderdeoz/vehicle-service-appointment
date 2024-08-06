import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EntityDto {
  @IsNumber()
  @IsOptional()
  public id?: number;

  @IsString()
  @IsOptional()
  public index?: number;

  @IsString()
  @IsOptional()
  public modelName?: string;

  @IsString()
  @IsOptional()
  public created_at?: Date | string;

  @IsString()
  @IsOptional()
  public updated_at?: Date | string;

  @IsString()
  @IsOptional()
  public deleted_at?: Date | string;

  @IsString()
  @IsOptional()
  public created_by?: string;

  @IsString()
  @IsOptional()
  public updated_by?: string;

  @IsString()
  @IsOptional()
  public deleted_by?: string;

  @IsNumber()
  @IsOptional()
  public _id?: number;

  @IsNumber()
  @IsOptional()
  public __v?: number;
}
