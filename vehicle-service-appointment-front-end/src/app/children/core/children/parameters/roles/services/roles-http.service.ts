import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AbstractHttpService } from '@app/shared/abstracts';
import { IRoleModel } from '@app/children/core/children/parameters/roles/models';
import { catchError } from 'rxjs/operators';
import { IHttpResponseModel } from '@app/shared/models';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RolesHttpService extends AbstractHttpService<IRoleModel> {
  public override readonly resourcePath =
    environment.API_DOMAIN.concat('roles');

  constructor() {
    super();
  }

  public findAllPermissionsByRole(
    params?:
      | {
          [param: string]:
            | string
            | number
            | boolean
            | ReadonlyArray<string | number | boolean>;
        }
      | HttpParams,
  ) {
    return this.httpClient
      .get<IHttpResponseModel<IRoleModel[]>>(
        `${this.resourcePath}/role-permissions`,
        {
          observe: 'response',
          params,
        },
      )
      .pipe(
        catchError((err, caught) => this.coreService.renderError(err, caught)),
      );
  }
}
