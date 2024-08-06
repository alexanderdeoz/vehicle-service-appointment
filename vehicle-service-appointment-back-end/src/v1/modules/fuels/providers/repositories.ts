import { DataSourceToken } from '@v1/shared/enum';
import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Fuel } from '@v1/modules/fuels/entities';

export const Repositories: Provider[] = [
  {
    provide: Fuel,
    useFactory: (ts: DataSource) => ts.getRepository(Fuel),
    inject: [DataSourceToken.B1],
  },
];
