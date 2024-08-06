import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ReadPaginationDto {
  @Expose()
  readonly totalItems: number;

  @Expose()
  readonly limit: number;

  @Expose()
  @IsOptional()
  readonly page?: number;
}
