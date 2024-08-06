import { IEntityModel } from '@app/shared/models';
import {
  ModelStatus,
  ModelType,
} from '@app/children/core/children/mechanical-workshop/models/enum';

export interface IModelModel extends IEntityModel {
  status?: ModelStatus;
  name?: ModelType;
}
