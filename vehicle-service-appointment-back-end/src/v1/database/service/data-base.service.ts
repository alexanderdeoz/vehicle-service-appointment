import { Inject, Injectable } from '@nestjs/common';
import { MakeDataSourceAbstract } from '@v1/shared/abstract/make-data-source.abstract';
import { DataSource, DataSourceOptions } from 'typeorm';
import { configuration } from '@v1/shared/config';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

@Injectable()
export class DataBaseService implements MakeDataSourceAbstract {
  constructor(
    @Inject(configuration.KEY)
    private readonly configService: ConfigType<typeof configuration>,
  ) {}

  public async getData(): Promise<DataSource> {
    const ds = new DataSource({
      ...this.configService.DATABASE,
      entities: [__dirname + '/../../modules/**/entities/*.entity{.ts,.js}'],
    } as DataSourceOptions);
    await ds.initialize();
    return ds;
  }

  public getTypeOrm(): TypeOrmModuleOptions {
    return this.configService.TYPEORM as TypeOrmModuleOptions;
  }
}
