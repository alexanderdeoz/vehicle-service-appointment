import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AbstractHttpService } from '@app/shared/abstracts';
import { IUserModel } from '@app/children/core/children/parameters/users/models';

@Injectable({
  providedIn: 'root',
})
export class UsersHttpService extends AbstractHttpService<IUserModel> {
  public override readonly resourcePath =
    environment.API_DOMAIN.concat('users');

  constructor() {
    super();
  }
}
