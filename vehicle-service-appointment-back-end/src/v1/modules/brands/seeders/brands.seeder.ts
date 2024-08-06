import { Inject, Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { Brand } from '@v1/modules/brands/entities';
import { BrandStatus } from '@v1/modules/brands/enums';

@Injectable()
export class BrandsSeeder implements Seeder {
  constructor(@Inject(Brand) private readonly repos: Repository<Brand>) {}

  async seed(): Promise<any> {
    const brands = [
      new Brand({
        name: 'Alianza Renault - Nissan - Mitsubishi',
        status: BrandStatus.ACTIVE,
      }),
      new Brand({
        name: 'BMW Group',
        status: BrandStatus.ACTIVE,
      }),
      new Brand({
        name: 'Ford',
        status: BrandStatus.ACTIVE,
      }),
      new Brand({
        name: 'Geely',
        status: BrandStatus.ACTIVE,
      }),
      new Brand({
        name: 'General Motors',
        status: BrandStatus.ACTIVE,
      }),
      new Brand({
        name: 'Grupo Stellantis',
        status: BrandStatus.ACTIVE,
      }),
      new Brand({
        name: 'Honda',
        status: BrandStatus.ACTIVE,
      }),
      new Brand({
        name: 'Hyundai Motor Company',
        status: BrandStatus.ACTIVE,
      }),
      new Brand({
        name: 'Mazda',
        status: BrandStatus.ACTIVE,
      }),
      new Brand({
        name: 'Subaru',
        status: BrandStatus.ACTIVE,
      }),
      new Brand({
        name: 'Suzuki',
        status: BrandStatus.ACTIVE,
      }),
      new Brand({
        name: 'Tata',
        status: BrandStatus.ACTIVE,
      }),
      new Brand({
        name: 'Tesla Inc',
        status: BrandStatus.ACTIVE,
      }),
      new Brand({
        name: 'Toyota',
        status: BrandStatus.ACTIVE,
      }),
      new Brand({
        name: 'Volkswagen',
        status: BrandStatus.ACTIVE,
      }),
    ] as DeepPartial<any>[];
    return this.repos.save(brands);
  }

  async drop(): Promise<any> {
    return this.repos.delete({});
  }
}
