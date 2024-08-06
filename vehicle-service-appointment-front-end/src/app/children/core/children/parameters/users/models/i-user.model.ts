import { IEntityModel } from '@app/shared/models';
import { IUserPermissionModel } from '@app/children/auth/models/role/i-user-permission.model';
import { IUserRoleModel } from '@app/children/auth/models/role/i-user-role.model';

export interface IUserModel extends IEntityModel {
  email?: string;
  password?: string;
  status?: string;
  name?: string;
  birth_date?: string;
  address?: string;
  identification?: string;
  phone?: string;
  roles?: IUserRoleModel[];
  user_permissions?: IUserPermissionModel[];
}
