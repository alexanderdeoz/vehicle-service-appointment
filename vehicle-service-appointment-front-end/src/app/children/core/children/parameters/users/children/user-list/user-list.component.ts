import { Component, DestroyRef, OnInit } from '@angular/core';
import { TableComponent } from '@app/shared/components/children/table/table.component';
import { IColumnModel } from '@app/shared/models';
import {
  AppRoute,
  CoreRoute,
  ParameterRoute,
  SelectionModeEnum,
  UserRoute,
} from '@app/shared/enum';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ConfirmationServiceConfig } from '@app/shared/config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IUserModel } from '@app/children/core/children/parameters/users/models';
import { AsyncPipe } from '@angular/common';
import { UsersHttpService } from '@app/children/core/children/parameters/users/services';
import { PaginatorState } from 'primeng/paginator';
import { UtilsService } from '@app/shared/services';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableComponent, AsyncPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  public users: IUserModel[] = [];
  public readonly columns: IColumnModel[] = [
    {
      header: '#',
      field: 'id',
    },
    {
      header: 'Coreo',
      field: 'email',
    },
    {
      header: 'Estado',
      field: 'status',
    },
    {
      header: 'Nombre',
      field: 'name',
    },
    {
      header: 'Fecha nacimiento',
      field: 'birth_date',
    },
    {
      header: 'identificación',
      field: 'identification',
    },
    {
      header: 'Teléfono',
      field: 'phone',
    },
    {
      header: 'Fecha creación',
      field: 'created_at',
    },
  ];
  public paginator = this.usersHttpService.paginator;
  public readonly menuItems: MenuItem[] = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: async (event) => {
        const index = this.utilsService.dataRow(event);
        if (!isNaN(index) && index >= 0) {
          const data = this.users[index];
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
          const data = this.users[index];
          this.deleteQuestion(data);
        }
      },
    },
  ];
  protected readonly SelectionModeEnum = SelectionModeEnum;

  constructor(
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    public readonly usersHttpService: UsersHttpService,
    private readonly confirmationService: ConfirmationService,
    private readonly utilsService: UtilsService,
  ) {
    this.usersHttpService.pagination
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((p) => {
        this.paginator = p;
      });
  }

  ngOnInit(): void {
    this.getAll();
  }

  public onPaginate($event: PaginatorState): void {
    this.usersHttpService.paginate({
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
      ParameterRoute.users,
      UserRoute.create,
    ]);
  }

  public deleteQuestion(d: IUserModel): void {
    this.confirmationService.confirm({
      ...ConfirmationServiceConfig,
      message: `¿Estás seguro de eliminar usuario ${d.id}?`,
      accept: () => this.delete(d),
      reject: () => {
        //
      },
    });
  }

  public async edit(d: IUserModel): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.parameters,
      ParameterRoute.users,
      UserRoute.editWithOutSuffix,
      d.id,
    ]);
  }

  public getAll(): void {
    this.usersHttpService
      .getAll(this.paginator)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.body?.data && res.body.data.length > 0) {
            this.users = res.body?.data ?? [];
          }
        },
      });
  }

  private delete(d: IUserModel): void {
    this.usersHttpService
      .destroy(d.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (_) => {
          this.filter(d.id);
        },
      });
  }

  private filter(id: number | undefined): void {
    this.users = this.users.filter((d) => d.id !== id);
  }
}
