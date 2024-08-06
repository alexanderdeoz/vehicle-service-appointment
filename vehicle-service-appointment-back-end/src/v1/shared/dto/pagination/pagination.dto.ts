import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { FindOptionsOrder, FindOptionsSelect } from 'typeorm';

export class PaginationDto<E> {
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalItems?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  page?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  order?: string;

  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  @IsString()
  select?: string;

  static getOffset(limit?: number, page?: number): number | null {
    return page && limit ? page * limit : null;
  }

  public orderValue(): FindOptionsOrder<E> {
    const order: FindOptionsOrder<E> = {};
    if (this.orderBy) {
      order[this.orderBy] = this.order as FindOptionsOrder<E>[string];
    }
    return order;
  }

  public selectValue(): FindOptionsSelect<E> | (keyof E)[] {
    return this.select?.split(',');
  }
}
