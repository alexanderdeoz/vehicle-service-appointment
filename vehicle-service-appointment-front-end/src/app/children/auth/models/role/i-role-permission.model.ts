import { IEntityModel } from '@app/shared/models';
import { IRoleModel } from '@app/children/core/children/parameters/roles/models';
import { IPermissionModel } from '@app/children/core/children/parameters/permissions/models';
import { IEntityFromSystemModel } from '@app/children/core/children/parameters/entities-from-system/models/i-entity-from-system.model';

export interface IRolePermissionModel extends IEntityModel {
  entity_from_system?: IEntityFromSystemModel;
  entity_from_system_id?: number;
  permission?: IPermissionModel;
  permission_id?: number;
  role_id?: number;
  role?: IRoleModel;
}
