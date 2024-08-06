import { Routes } from '@angular/router';
import { CoreRoute } from '@app/shared/enum';
import { DashboardComponent } from '@app/children/core/core.component';
import { GetOneUserResolve } from '@app/children/core/resolve/get-one-user.resolve';

export const CoreRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: [
      GetOneUserResolve,
      // \FindAllPermissionsByRoleResolve
    ],
    children: [
      {
        path: CoreRoute.dashboard,
        loadComponent: () =>
          import(
            '@app/children/core/children/dashboard/dashboard.component'
          ).then((c) => c.DashboardComponent),
      },
      {
        path: CoreRoute.scheduling,
        loadChildren: () =>
          import('./children/scheduling/scheduling.routes').then(
            (r) => r.CoreRoutes,
          ),
      },
      {
        path: CoreRoute.parameters,
        loadChildren: () =>
          import('./children/parameters/parameters.routes').then(
            (r) => r.ParametersRoutes,
          ),
      },
      {
        path: CoreRoute.mechanicalWorkshop,
        loadChildren: () =>
          import(
            './children/mechanical-workshop/mechanical-workshop.routes'
          ).then((r) => r.MechanicalWorkshopRoutes),
      },
    ],
  },
];
