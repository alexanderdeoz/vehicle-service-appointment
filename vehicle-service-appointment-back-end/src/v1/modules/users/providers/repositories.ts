import { DataSourceToken } from '@v1/shared/enum';
import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import {
  User,
  UserPermissionEntity,
  UserRole,
} from '@v1/modules/users/entities';
import { RolePermission } from '@v1/modules/users/entities/role-permissions.entity';

export const Repositories: Provider[] = [
  {
    provide: RolePermission,
    useFactory: (ts: DataSource) => ts.getRepository(RolePermission),
    inject: [DataSourceToken.B1],
  },
  {
    provide: User,
    useFactory: (ts: DataSource) => ts.getRepository(User),
    inject: [DataSourceToken.B1],
  },
  {
    provide: UserRole,
    useFactory: (ts: DataSource) => ts.getRepository(UserRole),
    inject: [DataSourceToken.B1],
  },
  {
    provide: UserPermissionEntity,
    useFactory: (ts: DataSource) => ts.getRepository(UserPermissionEntity),
    inject: [DataSourceToken.B1],
  },
];
