import { Routes } from '@angular/router';
import { ProductRoute } from '@app/shared/enum';
import { ProductListComponent } from '@app/children/core/children/mechanical-workshop/products/children/product-list/product-list.component';
import { ProductFormComponent } from '@app/children/core/children/mechanical-workshop/products/children/product-form/product-form.component';

export const PermissionsRoutes: Routes = [
  {
    path: ProductRoute.list,
    component: ProductListComponent,
  },
  {
    path: ProductRoute.create,
    component: ProductFormComponent,
  },
  {
    path: ProductRoute.editWithSuffix,
    component: ProductFormComponent,
  },
];
