import { Routes } from '@angular/router';
import { PermissionRoute } from '@app/shared/enum/routes/core/parameters/permission-route';
import { PermissionListComponent } from '@app/children/core/children/parameters/permissions/children/permission-list/permission-list.component';
import { PermissionFormComponent } from '@app/children/core/children/parameters/permissions/children/permission-form/permission-form.component';

export const PermissionsRoutes: Routes = [
  {
    path: PermissionRoute.list,
    component: PermissionListComponent,
  },
  {
    path: PermissionRoute.create,
    component: PermissionFormComponent,
  },
  {
    path: PermissionRoute.editWithSuffix,
    component: PermissionFormComponent,
  },
];
