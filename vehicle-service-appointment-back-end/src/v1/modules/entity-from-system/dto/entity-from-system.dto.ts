import { IsNumber } from 'class-validator';

export class EntityFromSystemDto {
  @IsNumber()
  id?: number;
}
