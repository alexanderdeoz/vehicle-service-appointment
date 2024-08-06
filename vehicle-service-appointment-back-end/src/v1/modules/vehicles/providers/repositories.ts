import { DataSourceToken } from '@v1/shared/enum';
import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import {
  Vehicle,
  VehicleProductsProductEntity,
} from '@v1/modules/vehicles/entities';

export const Repositories: Provider[] = [
  {
    provide: Vehicle,
    useFactory: (ts: DataSource) => ts.getRepository(Vehicle),
    inject: [DataSourceToken.B1],
  },
  {
    provide: VehicleProductsProductEntity,
    useFactory: (ts: DataSource) =>
      ts.getRepository(VehicleProductsProductEntity),
    inject: [DataSourceToken.B1],
  },
];
