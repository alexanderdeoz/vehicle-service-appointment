import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { RoleManagePermissionsComponent } from '@app/children/core/children/parameters/manage-permissions/role-manage-permissions/role-manage-permissions.component';
import { UserManagePermissionsComponent } from '@app/children/core/children/parameters/manage-permissions/user-manage-permissions/user-manage-permissions.component';

@Component({
  selector: 'app-manage-permissions',
  standalone: true,
  imports: [
    TabViewModule,
    RoleManagePermissionsComponent,
    UserManagePermissionsComponent,
  ],
  template: `
    <p>
      Tenga en cuenta que si restringe el acceso a un usuario, también debe
      estar restringiendo en el rol.
    </p>
    <p-tabView>
      <p-tabPanel header="Roles">
        <p>
          Si un usuario tiene uno de estos roles, tedrá los permisos que los
          parametrice.
        </p>
        <app-role-manage-permissions />
      </p-tabPanel>
      <p-tabPanel header="Usuarios">
        <p>
          Se puede asignar a un usuario específicamente los permisos que va a
          tener.
        </p>
        <app-user-manage-permissions />
      </p-tabPanel>
    </p-tabView>
  `,
})
export class ManagePermissionsComponent {}
