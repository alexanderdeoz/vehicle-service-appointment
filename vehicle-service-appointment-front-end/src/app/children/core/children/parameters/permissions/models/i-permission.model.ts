import { IEntityModel } from '@app/shared/models';
import {
  PermissionStatus,
  PermissionType,
} from '@app/children/core/children/parameters/permissions/enum';

export interface IPermissionModel extends IEntityModel {
  status?: PermissionStatus;
  name?: PermissionType;
}
