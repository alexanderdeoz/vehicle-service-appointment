import { IsString } from 'class-validator';

export class InitAppDto {
  @IsString()
  apiKey: string;
}
