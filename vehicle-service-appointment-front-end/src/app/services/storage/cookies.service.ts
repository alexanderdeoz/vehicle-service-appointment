import { CookieService } from 'ngx-cookie';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from '@app/services/core';
import { CookieConfig } from '@app/shared/config';
import { IUserModel } from '@app/children/core/children/parameters/users/models';
import { IUserPermissionModel } from '@app/children/auth/models/role';
import { IUserRoleModel } from '@app/children/auth/models/role/i-user-role.model';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  public readonly accessTokenSnapshot = new BehaviorSubject<string>('');

  constructor(
    private readonly cookieService: CookieService,
    private readonly configService: ConfigService,
  ) {}

  // User

  get roles(): IUserRoleModel[] {
    const d = sessionStorage.getItem('rolePermissions');
    return JSON.parse(d ? d : '[]');
  }

  set roles(d: IUserRoleModel[]) {
    sessionStorage.setItem('rolePermissions', JSON.stringify(d));
  }

  get userPermissions(): IUserPermissionModel[] {
    const d = sessionStorage.getItem('userPermissions');
    return JSON.parse(d ? d : '[]');
  }

  set userPermissions(d: IUserPermissionModel[]) {
    sessionStorage.setItem('userPermissions', JSON.stringify(d));
  }

  get user(): IUserModel {
    const d = this.cookieService.get(this.configService.config.COOKIE__USER);
    return JSON.parse(d ? d : '{}');
  }

  set user(payload: IUserModel) {
    this.cookieService.put(
      this.configService.config.COOKIE__USER,
      JSON.stringify(payload),
      CookieConfig,
    );
  }

  // Access token

  get accessToken(): string | undefined {
    const t = this.cookieService.get(
      this.configService.config.COOKIE__ACCESS_TOKEN,
    );
    if (t && t !== this.accessTokenSnapshot.value)
      this.accessTokenSnapshot.next(t);
    return t;
  }

  set accessToken(t: string) {
    this.cookieService.put(
      this.configService.config.COOKIE__ACCESS_TOKEN,
      t,
      CookieConfig,
    );
    if (t !== this.accessTokenSnapshot.value) this.accessTokenSnapshot.next(t);
  }

  public deleteAll(): void {
    this.cookieService.removeAll(CookieConfig);
  }
}
