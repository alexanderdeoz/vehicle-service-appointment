import { Routes } from '@angular/router';
import { EntityFromSystemRoute } from '@app/shared/enum';
import { EntitiesFromSystemFormComponent } from '@app/children/core/children/parameters/entities-from-system/children/entities-from-system-form/entities-from-system-form.component';
import { EntitiesFromSystemListComponent } from '@app/children/core/children/parameters/entities-from-system/children/entities-from-system-list/entities-from-system-list.component';

export const RolesRoutes: Routes = [
  {
    path: EntityFromSystemRoute.list,
    component: EntitiesFromSystemListComponent,
  },
  {
    path: EntityFromSystemRoute.create,
    component: EntitiesFromSystemFormComponent,
  },
  {
    path: EntityFromSystemRoute.editWithSuffix,
    component: EntitiesFromSystemFormComponent,
  },
];
