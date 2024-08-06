import { Global, Module } from '@nestjs/common';
import { BrandsService } from './services/brands.service';
import { BrandsController } from '@v1/modules/brands/controllers';
import { Repositories } from '@v1/modules/brands/providers';

@Global()
@Module({
  controllers: [BrandsController],
  providers: [BrandsService, ...Repositories],
  exports: [BrandsService, ...Repositories],
})
export class BrandsModule {}
