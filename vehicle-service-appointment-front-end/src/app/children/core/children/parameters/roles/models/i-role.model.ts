import { IEntityModel } from '@app/shared/models';
import {
  RoleStatus,
  RoleType,
} from '@app/children/core/children/parameters/roles/enum';
import { IRolePermissionModel } from '@app/children/auth/models/role';

export interface IRoleModel extends IEntityModel {
  status?: RoleStatus;
  name?: RoleType;
  role_permissions?: IRolePermissionModel[];
}
