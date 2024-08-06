import { IEntityModel } from '@app/shared/models';
import { IUserModel } from '@app/children/core/children/parameters/users/models';
import { IRoleModel } from '@app/children/core/children/parameters/roles/models';

export interface IUserRoleModel extends IEntityModel {
  role?: IRoleModel;
  user?: IUserModel;
}
