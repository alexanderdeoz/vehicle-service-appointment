import { Routes } from '@angular/router';
import { SchedulingRoute } from '@app/shared/enum/routes';

export const CoreRoutes: Routes = [
  {
    path: SchedulingRoute.appointments,
    loadChildren: () =>
      import('./appointments/appointments.routes').then((r) => r.CoreRoutes),
  },
];
