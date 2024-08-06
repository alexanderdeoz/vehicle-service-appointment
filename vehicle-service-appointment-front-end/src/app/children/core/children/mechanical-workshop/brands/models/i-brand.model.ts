import { IEntityModel } from '@app/shared/models';
import {
  BrandStatus,
  BrandType,
} from '@app/children/core/children/mechanical-workshop/brands/enum';

export interface IBrandModel extends IEntityModel {
  status?: BrandStatus;
  name?: BrandType;
}
