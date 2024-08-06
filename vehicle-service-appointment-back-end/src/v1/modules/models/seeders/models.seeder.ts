import { Inject, Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { Fuel } from '@v1/modules/fuels/entities';
import { Model } from '@v1/modules/models/entities';
import { ModelStatus } from '@v1/modules/models/enums';

@Injectable()
export class ModelsSeeder implements Seeder {
  constructor(@Inject(Model) private readonly repos: Repository<Model>) {}

  async seed(): Promise<any> {
    const fuels = [
      new Model({
        name: 'MUSTANG',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'ESCAPE HIBRIDA',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'MAVERICK HIBRIDA',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'MUSTANG MACH E',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'E TRANSIT',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'TERRITORY',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'BRONCO SPORT',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'EDGE',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'EXPLORER',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'BRONCO',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'EXPEDITION',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'EDGE ST',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'RANGER RAPTOR',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'EXPLORER ST',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'BRONCO RAPTOR',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'LOBO RAPTOR',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'MAVERICK TREMOR',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'BRONCO HERITAGE',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'MUSTANG DARK HORSE',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'EXPEDITION TIMBERLINE',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'TRANSIT COURIER',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'MAVERICK',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'MAVERICK',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'TRANSIT CHASIS',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'RANGER',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'TRANSIT CUSTOM',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'F-150',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'TRANSIT VAN',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'TRANSIT PASAJEROS',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'SUPER DUTY CHASIS',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'LOBO',
        status: ModelStatus.ACTIVE,
      }),
      new Model({
        name: 'F-250',
        status: ModelStatus.ACTIVE,
      }),
    ] as DeepPartial<Fuel>[];
    return this.repos.save(fuels);
  }

  async drop(): Promise<any> {
    return this.repos.delete({});
  }
}
