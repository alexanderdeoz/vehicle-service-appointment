import { Component, OnInit } from '@angular/core';
import { PermissionsHttpService } from '@app/children/core/children/parameters/permissions/services';
import { RolesHttpService } from '@app/children/core/children/parameters/roles/services';
import { IRoleModel } from '@app/children/core/children/parameters/roles/models';
import { IPermissionModel } from '@app/children/core/children/parameters/permissions/models';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Button, ButtonDirective } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { TableComponent } from '@app/shared/components/children/table/table.component';
import { IEntityModel } from '@app/shared/models';
import { DropdownModule } from 'primeng/dropdown';
import { ErrorMessageDirective } from '@app/shared/directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntitiesFromSystemHttpService } from '@app/children/core/children/parameters/entities-from-system/services';
import { IEntityFromSystemModel } from '@app/children/core/children/parameters/entities-from-system/models/i-entity-from-system.model';
import { CheckboxModule } from 'primeng/checkbox';
import { IRolePermissionModel } from '@app/children/auth/models/role';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-role-manage-permissions',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    Button,
    ButtonDirective,
    InputTextModule,
    NgIf,
    NgForOf,
    TableComponent,
    AsyncPipe,
    DropdownModule,
    ErrorMessageDirective,
    ReactiveFormsModule,
    CheckboxModule,
    FormsModule,
    MultiSelectModule,
  ],
  templateUrl: './role-manage-permissions.component.html',
})
export class RoleManagePermissionsComponent implements OnInit {
  protected selectedColumns: IEntityFromSystemModel[] = [];
  protected subtitle: string = 'ROLES';
  protected permissions: IPermissionModel[] = [];
  protected roles: IRoleModel[] = [];
  protected entitiesFromSystem: IEntityFromSystemModel[] = [];
  protected tableValue: IEntityModel[] = [];

  constructor(
    protected readonly entitiesFromSystemHttpService: EntitiesFromSystemHttpService,
    protected readonly permissionsHttpService: PermissionsHttpService,
    protected readonly rolesHttpService: RolesHttpService,
  ) {}

  ngOnInit(): void {
    this.getAllPermissions();
    this.getAllRoles();
    this.getAllEntitiesFromSystem();
  }

  protected changeCheckRole(
    role: IRoleModel,
    entity_from_system: IEntityFromSystemModel,
    permission: IPermissionModel,
  ): void {
    if (this.hasPermission(role, entity_from_system, permission)) {
      if (role?.role_permissions) {
        role.role_permissions = role?.role_permissions?.filter(
          (rp) =>
            !(
              rp.entity_from_system?.id == entity_from_system.id &&
              rp.permission?.id == permission.id
            ),
        );
      }
    } else {
      role?.role_permissions?.push(
        this.getValueCheckRole(role, entity_from_system, permission),
      );
    }
    this.updateRole(role);
  }

  protected reload(): void {
    this.getAllPermissions();
    this.getAllRoles();
    this.getAllEntitiesFromSystem();
  }

  protected hasPermission(
    role: IRoleModel,
    entity_from_system: IEntityFromSystemModel,
    permission: IPermissionModel,
  ): boolean {
    return (
      role.role_permissions?.some(
        (rp) =>
          rp.entity_from_system?.id == entity_from_system.id &&
          rp.permission?.id == permission.id,
      ) ?? false
    );
  }

  protected getValueCheckRole(
    role: IRoleModel,
    entity_from_system: IEntityFromSystemModel,
    permission: IPermissionModel,
  ): IRolePermissionModel {
    return {
      role: { id: role?.id },
      permission: { id: permission?.id },
      entity_from_system: { id: entity_from_system?.id },
    };
  }

  private getAllPermissions(): void {
    this.permissionsHttpService.findAllWithoutPagination().subscribe({
      next: (res) => {
        this.permissions = res.body?.data ?? [];
      },
    });
  }

  private getAllRoles(): void {
    this.rolesHttpService.findAllWithoutPagination().subscribe({
      next: (res) => {
        this.roles = res.body?.data ?? [];
        this.tableValue = this.roles;
      },
    });
  }

  private getAllEntitiesFromSystem(): void {
    this.entitiesFromSystemHttpService.findAllWithoutPagination().subscribe({
      next: (res) => {
        this.entitiesFromSystem = res.body?.data ?? [];
        if (this.entitiesFromSystem[0] && this.selectedColumns.length == 0) {
          this.selectedColumns.push(this.entitiesFromSystem[0]);
        }
      },
    });
  }

  private updateRole(user: IRoleModel): void {
    this.rolesHttpService
      .update(user.id, {
        id: user.id,
        role_permissions: user.role_permissions?.map((up) => ({
          role: { id: up.role?.id },
          permission: { id: up.permission?.id },
          entity_from_system: { id: up.entity_from_system?.id },
        })),
      })
      .subscribe();
  }
}
