import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookiesService } from '@app/services/storage';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cookiesService = inject(CookiesService);
  let headers = req.headers ? req.headers : new HttpHeaders();
  if (cookiesService.accessToken) {
    headers = headers.set(
      'Authorization',
      'Bearer ' + cookiesService.accessToken,
    );
  }
  return next(
    req.clone({
      headers: headers,
    }),
  );
};
