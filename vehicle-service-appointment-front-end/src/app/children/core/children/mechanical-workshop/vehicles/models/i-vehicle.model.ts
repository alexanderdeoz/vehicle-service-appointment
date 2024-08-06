import { IEntityModel } from '@app/shared/models';
import { VehicleStatus } from '@app/children/core/children/mechanical-workshop/vehicles/enums';
import { IVehicleProductsProductModel } from '@app/children/core/children/mechanical-workshop/vehicles/models/i-vehicle-products-product.model';
import { IAppointmentVehiclesVehicleModel } from '@app/children/core/children/scheduling/appointments/models';
import { IModelModel } from '@app/children/core/children/mechanical-workshop/models/models';
import { IBrandModel } from '@app/children/core/children/mechanical-workshop/brands/models';
import { IFuelModel } from '@app/children/core/children/mechanical-workshop/fuels/models';

export interface IVehicleModel extends IEntityModel {
  plate?: string;
  mileage?: string;
  status?: VehicleStatus;
  made_in?: string;
  warranty_up_to?: boolean;
  next_review_at?: Date;
  model?: IModelModel;
  brand?: IBrandModel;
  fuel?: IFuelModel;
  vehicleProductsProduct?: IVehicleProductsProductModel[];
  appointmentVehicle?: IAppointmentVehiclesVehicleModel[];
}
