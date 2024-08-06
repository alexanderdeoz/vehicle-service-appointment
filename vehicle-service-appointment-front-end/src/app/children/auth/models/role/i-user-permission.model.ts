import { IEntityModel } from '@app/shared/models';
import { IUserModel } from '@app/children/core/children/parameters/users/models';
import { IEntityFromSystemModel } from '@app/children/core/children/parameters/entities-from-system/models/i-entity-from-system.model';
import { IPermissionModel } from '@app/children/core/children/parameters/permissions/models';

export interface IUserPermissionModel extends IEntityModel {
  entity_from_system?: IEntityFromSystemModel;
  entity_from_system_id?: number;
  permission?: IPermissionModel;
  permission_id?: number;
  user_id?: number;
  user?: IUserModel;
}
