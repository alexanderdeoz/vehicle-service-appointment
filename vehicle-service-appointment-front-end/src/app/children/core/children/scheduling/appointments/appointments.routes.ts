import { Routes } from '@angular/router';
import { AppointmentRoute } from '@app/shared/enum';
import { AppointmentListComponent } from '@app/children/core/children/scheduling/appointments/children/appointment-list/appointment-list.component';
import { AppointmentFormComponent } from '@app/children/core/children/scheduling/appointments/children/appointment-form/appointment-form.component';

export const CoreRoutes: Routes = [
  {
    path: AppointmentRoute.list,
    component: AppointmentListComponent,
  },
  {
    path: AppointmentRoute.create,
    component: AppointmentFormComponent,
  },
  {
    path: AppointmentRoute.editWithSuffix,
    component: AppointmentFormComponent,
  },
];
