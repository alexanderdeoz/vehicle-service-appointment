import { DataSourceToken } from '@v1/shared/enum';
import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Role } from '@v1/modules/roles/entities';

export const Repositories: Provider[] = [
  {
    provide: Role,
    useFactory: (ts: DataSource) => ts.getRepository(Role),
    inject: [DataSourceToken.B1],
  },
];
