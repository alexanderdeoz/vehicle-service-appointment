import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { LoadingService } from '@app/services/core';
import { inject } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.setLoading(true, req.url);
  return next(req.clone()).pipe(
    catchError((err, caught) => {
      loadingService.setLoading(false, req.url);
      return throwError(() => err);
    }),
    map((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        loadingService.setLoading(false, req.url);
      }
      return event;
    }),
  );
};
