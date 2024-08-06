import { DataSourceToken } from '@v1/shared/enum';
import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Product } from '@v1/modules/products/entities';

export const Repositories: Provider[] = [
  {
    provide: Product,
    useFactory: (ts: DataSource) => ts.getRepository(Product),
    inject: [DataSourceToken.B1],
  },
];
