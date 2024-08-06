import { IEntityModel } from '@app/shared/models';
import { IAppointmentModel } from '@app/children/core/children/scheduling/appointments/models/i-appointment.model';
import { IVehicleModel } from '@app/children/core/children/mechanical-workshop/vehicles/models';
import {
  DamagePercentage,
  TypeService,
} from '@app/children/core/children/mechanical-workshop/vehicles/enums';

export interface IAppointmentVehiclesVehicleModel extends IEntityModel {
  damage_percentage: DamagePercentage;
  type_service: TypeService;
  status_service: TypeService;
  appointment: IAppointmentModel;
  vehicle: IVehicleModel;
}
