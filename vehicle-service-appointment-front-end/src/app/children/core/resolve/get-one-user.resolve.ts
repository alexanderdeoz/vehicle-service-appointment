import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { IUserModel } from '@app/children/core/children/parameters/users/models';
import { UsersHttpService } from '@app/children/core/children/parameters/users/services';
import { inject } from '@angular/core';
import { CookiesService } from '@app/services/storage';
import { lastValueFrom } from 'rxjs';
import { SideBarService } from '@app/children/core/services';

export const GetOneUserResolve: ResolveFn<IUserModel | undefined> = async (
  _: ActivatedRouteSnapshot,
  __: RouterStateSnapshot,
): Promise<IUserModel | undefined> => {
  const usersHttpService = inject(UsersHttpService);
  const cookiesService = inject(CookiesService);
  const sideBarService = inject(SideBarService);
  const user = (
    await lastValueFrom(usersHttpService.getOne(cookiesService.user.id))
  ).body?.data;
  if (user) {
    cookiesService.user = {
      id: user.id,
      index: user.index,
      modelName: user.modelName,
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at,
      created_by: user.created_by,
      updated_by: user.updated_by,
      deleted_by: user.deleted_by,
      _id: user._id,
      __v: user.__v,
      email: user.email,
      password: user.password,
      status: user.status,
      name: user.name,
      birth_date: user.birth_date,
      address: user.address,
      identification: user.identification,
      phone: user.phone,
    };
  }
  cookiesService.roles = user?.roles ?? [];
  cookiesService.userPermissions = user?.user_permissions ?? [];
  sideBarService.validateRoutes();
  return user;
};
