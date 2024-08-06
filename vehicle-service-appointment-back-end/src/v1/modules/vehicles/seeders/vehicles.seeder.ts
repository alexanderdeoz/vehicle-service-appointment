import { Inject, Injectable } from '@nestjs/common';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { Vehicle } from '@v1/modules/vehicles/entities';
import { Brand } from '@v1/modules/brands/entities';
import { Model } from '@v1/modules/models/entities';
import { Fuel } from '@v1/modules/fuels/entities';

@Injectable()
export class VehiclesSeeder implements Seeder {
  constructor(
    @Inject(Vehicle) private readonly repos: Repository<Vehicle>,
    @Inject(Model) private readonly modelRepos: Repository<Model>,
    @Inject(Brand) private readonly brandRepos: Repository<Brand>,
    @Inject(Fuel) private readonly fuelRepos: Repository<Fuel>,
  ) {}

  async seed(): Promise<any> {
    const models = await this.modelRepos.find();
    const brands = await this.brandRepos.find();
    const fuels = await this.fuelRepos.find();
    const vehicles = DataFactory.createForClass(Vehicle)
      .generate(25)
      .map((e) => {
        const indexM = Math.floor(Math.random() * models.length);
        const indexB = Math.floor(Math.random() * brands.length);
        const indexF = Math.floor(Math.random() * fuels.length);
        return {
          ...(e as DeepPartial<any>),
          model: models[indexM],
          brand: brands[indexB],
          fuel: fuels[indexF],
        };
      });
    return this.repos.save(vehicles);
  }

  async drop(): Promise<any> {
    return this.repos.delete({});
  }
}
