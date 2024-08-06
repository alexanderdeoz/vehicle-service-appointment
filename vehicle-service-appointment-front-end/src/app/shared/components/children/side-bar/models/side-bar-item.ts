import { MenuItem } from 'primeng/api';
import { IRolePermissionModel } from '@app/children/auth/models/role';

export interface SideBarItem extends MenuItem {
  rolePermissions?: IRolePermissionModel[];
  items?: SideBarItem[];
}
