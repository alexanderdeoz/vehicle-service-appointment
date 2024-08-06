import { Global, Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from '@v1/modules/products/controllers';
import { Repositories } from '@v1/modules/products/providers';

@Global()
@Module({
  controllers: [ProductsController],
  providers: [...Repositories, ProductsService],
  exports: [...Repositories],
})
export class ProductsModule {}
