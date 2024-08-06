import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { ToastMessageService } from '@app/shared/services/toast-message.service';
import { IHttpResponseModel } from '@app/shared/models';

export const NotificationInterceptor: HttpInterceptorFn = (req, next) => {
  const toastMessageService = inject(ToastMessageService);
  return next(req.clone()).pipe(
    tap((event: HttpEvent<any>): void => {
      if (event instanceof HttpResponse) {
        const message = (event as HttpResponse<IHttpResponseModel<any>>).body
          ?.message;
        if (message?.severity) {
          toastMessageService.custom(message);
        }
      }
    }),
  );
};
