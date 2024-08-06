import { IEntityModel } from '@app/shared/models';
import {
  FuelStatus,
  FuelType,
} from '@app/children/core/children/mechanical-workshop/fuels/enum';

export interface IFuelModel extends IEntityModel {
  status?: FuelStatus;
  name?: FuelType;
}
