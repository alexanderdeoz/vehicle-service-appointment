import { Routes } from '@angular/router';
import { ParameterRoute } from '@app/shared/enum/routes/core/parameters/parameter-route';

export const ParametersRoutes: Routes = [
  {
    path: ParameterRoute.managePermissions,
    loadComponent: () =>
      import('./manage-permissions/manage-permissions.component').then(
        (r) => r.ManagePermissionsComponent,
      ),
  },
  {
    path: ParameterRoute.permissions,
    loadChildren: () =>
      import('./permissions/permissions.routes').then(
        (r) => r.PermissionsRoutes,
      ),
  },
  {
    path: ParameterRoute.roles,
    loadChildren: () =>
      import('./roles/roles.routes').then((r) => r.RolesRoutes),
  },
  {
    path: ParameterRoute.users,
    loadChildren: () =>
      import('./users/users.routes').then((r) => r.UsersRoutes),
  },
  {
    path: ParameterRoute.entitiesFromSystem,
    loadChildren: () =>
      import('./entities-from-system/entities-from-system.routes').then(
        (r) => r.RolesRoutes,
      ),
  },
];
