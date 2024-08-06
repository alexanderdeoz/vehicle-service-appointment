import { Component, OnInit } from '@angular/core';
import { IEntityModel } from '@app/shared/models';
import { IEntityFromSystemModel } from '@app/children/core/children/parameters/entities-from-system/models/i-entity-from-system.model';
import { IPermissionModel } from '@app/children/core/children/parameters/permissions/models';
import { IUserModel } from '@app/children/core/children/parameters/users/models';
import { EntitiesFromSystemHttpService } from '@app/children/core/children/parameters/entities-from-system/services';
import { PermissionsHttpService } from '@app/children/core/children/parameters/permissions/services';
import { UsersHttpService } from '@app/children/core/children/parameters/users/services';
import { IUserPermissionModel } from '@app/children/auth/models/role';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-manage-permissions',
  standalone: true,
  imports: [
    AsyncPipe,
    Button,
    CardModule,
    CheckboxModule,
    MultiSelectModule,
    NgForOf,
    PrimeTemplate,
    TableModule,
    FormsModule,
  ],
  templateUrl: './user-manage-permissions.component.html',
})
export class UserManagePermissionsComponent implements OnInit {
  protected selectedColumns: IEntityFromSystemModel[] = [];
  protected subtitle: string = 'USUARIOS';
  protected permissions: IPermissionModel[] = [];
  protected users: IUserModel[] = [];
  protected entitiesFromSystem: IEntityFromSystemModel[] = [];
  protected tableValue: IEntityModel[] = [];

  constructor(
    protected readonly entitiesFromSystemHttpService: EntitiesFromSystemHttpService,
    protected readonly permissionsHttpService: PermissionsHttpService,
    protected readonly usersHttpService: UsersHttpService,
  ) {}

  ngOnInit(): void {
    this.getAllPermissions();
    this.getAllUsers();
    this.getAllEntitiesFromSystem();
  }

  protected changeCheckUser(
    user: IUserModel,
    entity_from_system: IEntityFromSystemModel,
    permission: IPermissionModel,
  ): void {
    if (this.hasPermission(user, entity_from_system, permission)) {
      user.user_permissions = user.user_permissions?.filter(
        (rp) =>
          !(
            rp.entity_from_system?.id == entity_from_system.id &&
            rp.permission?.id == permission.id
          ),
      );
    } else {
      user.user_permissions?.push(
        this.getValueCheckUser(user, entity_from_system, permission),
      );
    }
    this.updateUser(user);
  }

  protected reload(): void {
    this.getAllPermissions();
    this.getAllUsers();
    this.getAllEntitiesFromSystem();
  }

  protected hasPermission(
    user: IUserModel,
    entity_from_system: IEntityFromSystemModel,
    permission: IPermissionModel,
  ): boolean {
    return (
      user?.user_permissions?.some(
        (rp) =>
          rp.entity_from_system?.id == entity_from_system.id &&
          rp.permission?.id == permission.id,
      ) ?? false
    );
  }

  protected getValueCheckUser(
    user: IUserModel,
    entity_from_system: IEntityFromSystemModel,
    permission: IPermissionModel,
  ): IUserPermissionModel {
    return {
      user: { id: user?.id },
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

  private getAllUsers(): void {
    this.usersHttpService.findAllWithoutPagination().subscribe({
      next: (res) => {
        this.users = res.body?.data ?? [];
        this.tableValue = this.users;
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

  private updateUser(user: IUserModel): void {
    this.usersHttpService
      .update(user.id, {
        id: user.id,
        user_permissions: user.user_permissions?.map((up) => ({
          user: { id: up.user?.id },
          permission: { id: up.permission?.id },
          entity_from_system: { id: up.entity_from_system?.id },
        })),
      })
      .subscribe();
  }
}
