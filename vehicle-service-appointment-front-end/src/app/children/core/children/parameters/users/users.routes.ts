import { Routes } from '@angular/router';
import { UserRoute } from '@app/shared/enum';
import { UserListComponent } from '@app/children/core/children/parameters/users/children/user-list/user-list.component';
import { UserFormComponent } from '@app/children/core/children/parameters/users/children/user-form/user-form.component';

export const UsersRoutes: Routes = [
  {
    path: UserRoute.list,
    component: UserListComponent,
  },
  {
    path: UserRoute.create,
    component: UserFormComponent,
  },
  {
    path: UserRoute.editWithSuffix,
    component: UserFormComponent,
  },
];
