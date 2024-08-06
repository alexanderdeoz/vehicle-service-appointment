import { Routes } from '@angular/router';
import { AppRoute } from '@app/shared/enum';
import { InitGuard } from '@app/guards';
import { EnterToAuthGuard } from '@app/children/auth/guards';
import { EnterToCoreGuard } from '@app/children/core/guards';
import { RedirectGuard } from '@app/children/common/guards';

export const AppRoutes: Routes = [
  {
    path: '',
    canActivate: [InitGuard],
    children: [
      {
        path: AppRoute.auth,
        canActivateChild: [EnterToAuthGuard],
        loadChildren: () =>
          import('./children/auth/auth.routes').then((r) => r.AuthRoutes),
      },
      {
        path: AppRoute.common,
        loadChildren: () =>
          import('./children/common/common.routes').then((r) => r.CommonRoutes),
      },
      {
        path: AppRoute.core,
        canActivateChild: [EnterToCoreGuard],
        loadChildren: () =>
          import('./children/core/core.routes').then((r) => r.CoreRoutes),
      },
      {
        path: '**',
        canActivate: [RedirectGuard],
        children: [],
      },
    ],
  },
];
