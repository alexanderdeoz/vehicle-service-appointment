import { IEntityModel } from '@app/shared/models';
import { IEntityFromSystemModel } from '@app/children/core/children/parameters/entities-from-system/models/i-entity-from-system.model';
import { IPermissionModel } from '@app/children/core/children/parameters/permissions/models';

export interface IEntityFromSystemPermissionModel extends IEntityModel {
  entityFromSystem?: IEntityFromSystemModel;
  permission?: IPermissionModel;
}
