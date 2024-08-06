import { DataSourceToken } from '@v1/shared/enum';
import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Brand } from '@v1/modules/brands/entities';

export const Repositories: Provider[] = [
  {
    provide: Brand,
    useFactory: (ts: DataSource) => ts.getRepository(Brand),
    inject: [DataSourceToken.B1],
  },
];
