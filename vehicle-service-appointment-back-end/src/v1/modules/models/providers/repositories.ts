import { DataSourceToken } from '@v1/shared/enum';
import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Model } from '@v1/modules/models/entities';

export const Repositories: Provider[] = [
  {
    provide: Model,
    useFactory: (ts: DataSource) => ts.getRepository(Model),
    inject: [DataSourceToken.B1],
  },
];
