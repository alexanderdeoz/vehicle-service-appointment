import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastMessageService} from '@app/shared/services/toast-message.service';
import {IPaginatorModel} from '@app/shared/models';

/**
 * Diseñado para ser una ayuda para el AbstractHttpService (envío de handlerException...)
 * */
@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private readonly toastMessageService: ToastMessageService) {}

  public get paginator(): IPaginatorModel {
    return {
      limit: 5,
      page: 0,
      totalItems: 0,
    };
  }

  /**
   * Se lanza cuando en un observable hay un error, entonces se mostrará un mensaje de toast.
   * */
  public renderError(err: any, _: Observable<any>) {
    if (err instanceof HttpErrorResponse) {
      // muestra mensajes que envía el BackEnd
      if (err.error?.summary && err.error?.detail) {
        this.toastMessageService.error(err.error);
      }

      // muestra cualquier error
      if (err.error?.message) {
        this.toastMessageService.error({
          summary: 'Error',
          detail: err.error.message,
        });
      }
    }

    let sms: string = err.toString();
    if (err?.error?.summary) {
      sms = `${err?.error?.summary} ${err?.error?.detail}`;
    }
    if (err?.error?.message) {
      sms = err?.error?.message;
    }
    return throwError(() => sms);
  }
}
