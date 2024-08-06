import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { CookiesService } from '@app/services/storage';
import { lastValueFrom } from 'rxjs';
import { RolesHttpService } from '@app/children/core/children/parameters/roles/services';
import { HttpParams } from '@angular/common/http';
import { IRoleModel } from '@app/children/core/children/parameters/roles/models';

export const FindAllPermissionsByRoleResolve: ResolveFn<
  IRoleModel[] | undefined
> = async (
  _: ActivatedRouteSnapshot,
  __: RouterStateSnapshot,
): Promise<IRoleModel[] | undefined> => {
  const rolesHttpService = inject(RolesHttpService);
  const cookiesService = inject(CookiesService);
  const params: HttpParams = new HttpParams().set(
    'rol_ids',
    cookiesService.roles.map((r) => r.role_id).toString(),
  );
  const user = (
    await lastValueFrom(rolesHttpService.findAllPermissionsByRole(params))
  ).body?.data;
  return user;
};
