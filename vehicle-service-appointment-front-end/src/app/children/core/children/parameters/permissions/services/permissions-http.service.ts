import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AbstractHttpService } from '@app/shared/abstracts';
import { IPermissionModel } from '@app/children/core/children/parameters/permissions/models';

@Injectable({
  providedIn: 'root',
})
export class PermissionsHttpService extends AbstractHttpService<IPermissionModel> {
  public override readonly resourcePath =
    environment.API_DOMAIN.concat('permissions');

  constructor() {
    super();
  }
}
