import { Inject, Injectable } from '@nestjs/common';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { Product } from '@v1/modules/products/entities';

@Injectable()
export class ProductsSeeder implements Seeder {
  constructor(@Inject(Product) private readonly repos: Repository<Product>) {}

  async seed(): Promise<any> {
    const products = DataFactory.createForClass(Product)
      .generate(25)
      .map((e) => e as DeepPartial<any>);
    return this.repos.save(products);
  }

  async drop(): Promise<any> {
    return this.repos.delete({});
  }
}
