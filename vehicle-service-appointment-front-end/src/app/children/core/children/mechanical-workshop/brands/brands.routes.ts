import { Routes } from '@angular/router';
import { BrandRoute } from '@app/shared/enum';
import { BrandListComponent } from '@app/children/core/children/mechanical-workshop/brands/children/brand-list/brand-list.component';
import { BrandFormComponent } from '@app/children/core/children/mechanical-workshop/brands/children/brand-form/brand-form.component';

export const BrandsRoutes: Routes = [
  {
    path: BrandRoute.list,
    component: BrandListComponent,
  },
  {
    path: BrandRoute.create,
    component: BrandFormComponent,
  },
  {
    path: BrandRoute.editWithSuffix,
    component: BrandFormComponent,
  },
];
