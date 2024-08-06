import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { SessionService } from '@app/services';

export const AuthenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(SessionService);
  return next(req.clone()).pipe(
    catchError((err: any) => {
      if (err.status == 401 || err.status == 403) {
        sessionService.onAcceptLogout().then((_) => null);
      }
      return throwError(() => err);
    }),
  );
};
