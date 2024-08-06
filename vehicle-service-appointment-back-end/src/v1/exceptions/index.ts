import { APP_FILTER } from '@nestjs/core/constants';
import { ExceptionsFilter } from './exceptions.filter';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';

export const Exceptions: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: ExceptionsFilter,
  },
];
