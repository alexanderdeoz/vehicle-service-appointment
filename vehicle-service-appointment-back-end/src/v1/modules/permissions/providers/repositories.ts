import { DataSourceToken } from '@v1/shared/enum';
import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Permission } from '@v1/modules/permissions/entities';

export const Repositories: Provider[] = [
  {
    provide: Permission,
    useFactory: (ts: DataSource) => ts.getRepository(Permission),
    inject: [DataSourceToken.B1],
  },
];
