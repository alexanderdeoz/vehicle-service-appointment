import { Inject, Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { Fuel } from '@v1/modules/fuels/entities';
import { FuelStatus } from '@v1/modules/fuels/enums';

@Injectable()
export class FuelsSeeder implements Seeder {
  constructor(@Inject(Fuel) private readonly repos: Repository<Fuel>) {}

  async seed(): Promise<any> {
    const fuels = [
      new Fuel({
        name: 'Diesel',
        status: FuelStatus.ACTIVE,
      }),
      new Fuel({
        name: 'Gasolina',
        status: FuelStatus.ACTIVE,
      }),
    ] as DeepPartial<Fuel>[];
    return this.repos.save(fuels);
  }

  async drop(): Promise<any> {
    return this.repos.delete({});
  }
}
