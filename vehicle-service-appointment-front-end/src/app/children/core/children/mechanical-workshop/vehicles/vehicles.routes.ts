import { Routes } from '@angular/router';
import { VehicleRoute } from '@app/shared/enum';
import { VehicleListComponent } from '@app/children/core/children/mechanical-workshop/vehicles/children/vehicle-list/vehicle-list.component';
import { VehicleReportStatusComponent } from '@app/children/core/children/mechanical-workshop/vehicles/children/vehicle-report-status/vehicle-report-status.component';

export const UsersRoutes: Routes = [
  {
    path: VehicleRoute.list,
    component: VehicleListComponent,
  },
  {
    path: VehicleRoute.vehicleReportStatus,
    component: VehicleReportStatusComponent,
  },
];
