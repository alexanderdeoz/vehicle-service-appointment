import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataBaseService } from '@v1/database/service';

@Injectable()
export class TypeOrmFactory implements TypeOrmOptionsFactory {
  constructor(private readonly dataBaseService: DataBaseService) {}

  public async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return this.dataBaseService.getTypeOrm();
  }
}
