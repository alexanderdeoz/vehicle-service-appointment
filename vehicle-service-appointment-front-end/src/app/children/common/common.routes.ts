import { Routes } from '@angular/router';
import { CommonRoute } from '@app/shared/enum';

export const CommonRoutes: Routes = [
  {
    path: CommonRoute.notFound,
    loadComponent: () =>
      import(
        '@app/children/common/children/not-found/not-found.component'
      ).then((c) => c.NotFoundComponent),
  },
];
