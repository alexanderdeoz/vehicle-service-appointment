import { IEntityModel } from '@app/shared/models';
import {
  EntityFromSystemStatus,
  EntityFromSystemType,
} from '@app/children/core/children/parameters/entities-from-system/enum';
import { IEntityFromSystemPermissionModel } from '@app/children/core/children/parameters/entities-from-system/models/i-entity-from-system-permission.model';

export interface IEntityFromSystemModel extends IEntityModel {
  status?: EntityFromSystemStatus;
  name?: EntityFromSystemType;
  icon?: string;
  routerLink?: string;
  father?: IEntityFromSystemModel;
  children?: IEntityFromSystemModel[];
  entityFromSystemPermission?: IEntityFromSystemPermissionModel[];
}
