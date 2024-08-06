import { IEntityModel } from '@app/shared/models';
import { IAppointmentVehiclesVehicleModel } from '@app/children/core/children/scheduling/appointments/models/i-appointment-vehicles-vehicle.model';
import { IVehicleProductsProductModel } from '@app/children/core/children/mechanical-workshop/vehicles/models';

export interface IAppointmentModel extends IEntityModel {
  status: string;
  scheduled_at: Date;
  description: string;
  valid_until_at: Date;
  reason: string;
  appointmentVehicle: IAppointmentVehiclesVehicleModel[];
  appointmentProducts: IVehicleProductsProductModel[];
}
