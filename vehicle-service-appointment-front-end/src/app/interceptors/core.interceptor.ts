import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookiesService } from '@app/services/storage';

export const CoreInterceptor: HttpInterceptorFn = (req, next) => {
  const cookiesService = inject(CookiesService);
  let headers = req.headers ? req.headers : new HttpHeaders();
  if (!headers?.has('user-account-id')) {
    headers = headers.set('user-id', `${cookiesService.user?.id ?? ''}`);
  }
  return next(req.clone({ headers: headers }));
};
