import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResInterceptor } from './res.interceptor';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';

export const Interceptors: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ResInterceptor,
  },
];
