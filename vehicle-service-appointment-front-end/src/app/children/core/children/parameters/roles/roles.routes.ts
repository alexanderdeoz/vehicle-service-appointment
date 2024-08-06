import { Routes } from '@angular/router';
import { RoleListComponent } from '@app/children/core/children/parameters/roles/children/role-list/role-list.component';
import { RoleFormComponent } from '@app/children/core/children/parameters/roles/children/role-form/role-form.component';
import { RoleRoute } from '@app/shared/enum';

export const RolesRoutes: Routes = [
  {
    path: RoleRoute.list,
    component: RoleListComponent,
  },
  {
    path: RoleRoute.create,
    component: RoleFormComponent,
  },
  {
    path: RoleRoute.editWithSuffix,
    component: RoleFormComponent,
  },
];
