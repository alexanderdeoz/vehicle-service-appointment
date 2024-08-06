import {HttpInterceptorFn} from '@angular/common/http';
import {AuthenticationInterceptor, TokenInterceptor,} from '@app/children/auth/interceptors';
import {NotificationInterceptor} from '@app/interceptors/notification.interceptor';
import {CoreInterceptor} from '@app/interceptors/core.interceptor';
import {LoadingInterceptor} from '@app/interceptors/loading.interceptor';

/** Http interceptor providers in outside-in order */
export const HttpInterceptorProviders: HttpInterceptorFn[] = [
  AuthenticationInterceptor,
  TokenInterceptor,
  NotificationInterceptor,
  CoreInterceptor,
  LoadingInterceptor,
];
