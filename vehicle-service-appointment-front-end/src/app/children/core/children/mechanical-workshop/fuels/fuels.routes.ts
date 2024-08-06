import { Routes } from '@angular/router';
import { FuelRoute } from '@app/shared/enum';
import { FuelListComponent } from '@app/children/core/children/mechanical-workshop/fuels/children/fuel-list/fuel-list.component';
import { FuelFormComponent } from '@app/children/core/children/mechanical-workshop/fuels/children/fuel-form/fuel-form.component';

export const FuelsRoutes: Routes = [
  {
    path: FuelRoute.list,
    component: FuelListComponent,
  },
  {
    path: FuelRoute.create,
    component: FuelFormComponent,
  },
  {
    path: FuelRoute.editWithSuffix,
    component: FuelFormComponent,
  },
];
