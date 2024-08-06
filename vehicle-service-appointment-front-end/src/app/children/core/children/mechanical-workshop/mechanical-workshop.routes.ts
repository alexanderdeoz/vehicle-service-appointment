import { Routes } from '@angular/router';
import { MechanicalWorkshopRoute } from '@app/shared/enum';

export const MechanicalWorkshopRoutes: Routes = [
  {
    path: MechanicalWorkshopRoute.brands,
    loadChildren: () =>
      import('./brands/brands.routes').then((r) => r.BrandsRoutes),
  },
  {
    path: MechanicalWorkshopRoute.fuels,
    loadChildren: () =>
      import('./fuels/fuels.routes').then((r) => r.FuelsRoutes),
  },
  {
    path: MechanicalWorkshopRoute.models,
    loadChildren: () =>
      import('./models/models.routes').then((r) => r.ModelsRoutes),
  },
  {
    path: MechanicalWorkshopRoute.products,
    loadChildren: () =>
      import('./products/products.routes').then((r) => r.PermissionsRoutes),
  },
  {
    path: MechanicalWorkshopRoute.vehicles,
    loadChildren: () =>
      import('./vehicles/vehicles.routes').then((r) => r.UsersRoutes),
  },
];
