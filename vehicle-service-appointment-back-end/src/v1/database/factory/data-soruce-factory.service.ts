import { Injectable } from '@nestjs/common';
import { DataBaseService } from '@v1/database/service';
import { DataSource } from 'typeorm';

@Injectable()
export class DataSourceFactory {
  constructor(private readonly dataBaseService: DataBaseService) {}

  public create(): Promise<DataSource> {
    return this.dataBaseService.getData();
  }
}
