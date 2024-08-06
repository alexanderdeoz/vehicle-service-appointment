import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import { AbstractHttpService } from '@app/shared/abstracts';
import {
  ILoginRequestModel,
  ILoginResponseModel,
} from '@app/children/auth/models';
import { IHttpResponseModel } from '@app/shared/models';
import { UnprocessableEntityException } from '@app/children/auth/exceptions';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService extends AbstractHttpService<any> {
  public readonly loadedLogin = new BehaviorSubject<boolean>(true);
  private API_URL_ENTERPRISE = environment.API_DOMAIN;

  public login(payload: ILoginRequestModel) {
    this.loadedLogin.next(false);
    return this.httpClient
      .post<IHttpResponseModel<ILoginResponseModel>>(
        `${this.API_URL_ENTERPRISE}auth/login`,
        payload,
        {
          observe: 'response',
        },
      )
      .pipe(
        tap({
          next: (res) => {
            const payload = res.body?.data;
            this.loadedLogin.next(true);
            if (!payload?.user) {
              throw new UnprocessableEntityException({
                summary: 'Respuesta del servidor inválida',
                detail: 'Usuario no enviados por servidor',
                statusCode: 422,
              });
            }
            if (!payload?.accessToken) {
              throw new UnprocessableEntityException({
                summary: 'Respuesta del servidor inválida',
                detail: 'Token de acceso no enviado por servidor',
                statusCode: 422,
              });
            }
          },
          error: (_) => {
            this.loadedLogin.next(true);
          },
        }),
        catchError((err, caught) => this.coreService.renderError(err, caught)),
      );
  }
}
