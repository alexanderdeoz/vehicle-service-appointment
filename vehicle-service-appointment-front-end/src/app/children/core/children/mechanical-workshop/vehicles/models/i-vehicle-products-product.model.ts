import { IEntityModel } from '@app/shared/models';
import { IVehicleModel } from '@app/children/core/children/mechanical-workshop/vehicles/models/i-vehicle.model';
import { IProductModel } from '@app/children/core/children/mechanical-workshop/products/models';
import { IAppointmentModel } from '@app/children/core/children/scheduling/appointments/models';

export interface IVehicleProductsProductModel extends IEntityModel {
  child_id?: number;
  repair?: boolean;
  appointment_id?: number;
  vehicle_id?: number;
  product_id?: number;
  child?: IVehicleProductsProductModel;
  appointment?: IAppointmentModel;
  vehicle?: IVehicleModel;
  product?: IProductModel;
}
