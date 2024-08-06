import { Component, DestroyRef, OnInit } from '@angular/core';
import { TableComponent } from '@app/shared/components/children/table/table.component';
import { IColumnModel } from '@app/shared/models';
import {
  AppRoute,
  CoreRoute,
  ParameterRoute,
  PermissionRoute,
  SelectionModeEnum,
} from '@app/shared/enum';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ConfirmationServiceConfig } from '@app/shared/config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PermissionsHttpService } from '@app/children/core/children/parameters/permissions/services';
import { IPermissionModel } from '@app/children/core/children/parameters/permissions/models';
import { AsyncPipe } from '@angular/common';
import { PaginatorState } from 'primeng/paginator';
import { UtilsService } from '@app/shared/services';

@Component({
  selector: 'app-permission-list',
  standalone: true,
  imports: [TableComponent, AsyncPipe],
  templateUrl: './permission-list.component.html',
  styleUrl: './permission-list.component.scss',
})
export class PermissionListComponent implements OnInit {
  public permissions: IPermissionModel[] = [];
  public readonly columns: IColumnModel[] = [
    {
      header: '#',
      field: 'id',
    },
    {
      header: 'Nombre',
      field: 'name',
    },
    {
      header: 'Estado',
      field: 'status',
    },
    {
      header: 'Fecha creación',
      field: 'created_at',
    },
  ];
  public paginator = this.permissionsHttpService.paginator;
  public readonly menuItems: MenuItem[] = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: async (event) => {
        const index = this.utilsService.dataRow(event);
        if (!isNaN(index) && index >= 0) {
          const data = this.permissions[index];
          await this.edit(data);
        }
      },
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: (event) => {
        const index = this.utilsService.dataRow(event);
        if (!isNaN(index) && index >= 0) {
          const data = this.permissions[index];
          this.deleteQuestion(data);
        }
      },
    },
  ];
  protected readonly SelectionModeEnum = SelectionModeEnum;

  constructor(
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    public readonly permissionsHttpService: PermissionsHttpService,
    private readonly confirmationService: ConfirmationService,
    private readonly utilsService: UtilsService,
  ) {
    this.permissionsHttpService.pagination
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((p) => {
        this.paginator = p;
      });
  }

  ngOnInit(): void {
    this.getAll();
  }

  public onPaginate($event: PaginatorState): void {
    this.permissionsHttpService.paginate({
      ...this.paginator,
      page: $event.page ?? 0,
    });
    this.getAll();
  }

  async create(): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.parameters,
      ParameterRoute.permissions,
      PermissionRoute.create,
    ]);
  }

  public deleteQuestion(d: IPermissionModel): void {
    this.confirmationService.confirm({
      ...ConfirmationServiceConfig,
      message: `¿Estás seguro de eliminar cita ${d.id}?`,
      accept: () => this.delete(d),
      reject: () => {
        //
      },
    });
  }

  public async edit(d: IPermissionModel): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.parameters,
      ParameterRoute.permissions,
      PermissionRoute.editWithOutSuffix,
      d.id,
    ]);
  }

  public getAll(): void {
    this.permissionsHttpService
      .getAll(this.paginator)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value) => {
          if (value.body?.data && value.body.data.length > 0) {
            this.permissions = value.body?.data ?? [];
          }
        },
      });
  }

  private delete(d: IPermissionModel): void {
    this.permissionsHttpService
      .destroy(d.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (_) => {
          this.filter(d.id);
        },
      });
  }

  private filter(id: number | undefined): void {
    this.permissions = this.permissions.filter((d) => d.id !== id);
  }
}
