import { Global, Module } from '@nestjs/common';
import { DataSourceToken } from '@v1/shared/enum/db/data-source-token.enum';
import { DataSourceFactory, TypeOrmFactory } from '@v1/database/factory';
import { DataBaseService } from '@v1/database/service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

@Global()
@Module({
  providers: [
    {
      provide: DataSourceToken.B1,
      useFactory: (f: DataSourceFactory) => f.create(),
      inject: [DataSourceFactory],
    },
    DataSourceFactory,
    DataBaseService,
    TypeOrmFactory,
  ],
  exports: [
    DataSourceToken.B1,
    DataSourceFactory,
    TypeOrmFactory,
    DataBaseService,
  ],
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmFactory,
      inject: [TypeOrmFactory, DataBaseService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class DatabaseModule {}
