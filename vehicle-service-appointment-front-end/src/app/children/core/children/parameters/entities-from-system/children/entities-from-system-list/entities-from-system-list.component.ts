import { Component, DestroyRef, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TableComponent } from '@app/shared/components/children/table/table.component';
import { IColumnModel } from '@app/shared/models';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { UtilsService } from '@app/shared/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginatorState } from 'primeng/paginator';
import {
  AppRoute,
  CoreRoute,
  EntityFromSystemRoute,
  ParameterRoute,
  SelectionModeEnum,
} from '@app/shared/enum';
import { ConfirmationServiceConfig } from '@app/shared/config';
import { IEntityFromSystemModel } from '@app/children/core/children/parameters/entities-from-system/models/i-entity-from-system.model';
import { EntitiesFromSystemHttpService } from '@app/children/core/children/parameters/entities-from-system/services';

@Component({
  selector: 'app-entities-from-system-list',
  standalone: true,
  imports: [AsyncPipe, TableComponent],
  templateUrl: './entities-from-system-list.component.html',
  styleUrl: './entities-from-system-list.component.scss',
})
export class EntitiesFromSystemListComponent implements OnInit {
  public entitiesFromSystem: IEntityFromSystemModel[] = [];
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
  public paginator = this.entitiesFromSystemHttpService.paginator;
  public readonly menuItems: MenuItem[] = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: async (event) => {
        const index = this.utilsService.dataRow(event);
        if (!isNaN(index) && index >= 0) {
          const data = this.entitiesFromSystem[index];
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
          const data = this.entitiesFromSystem[index];
          this.deleteQuestion(data);
        }
      },
    },
  ];
  protected readonly SelectionModeEnum = SelectionModeEnum;

  constructor(
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    public readonly entitiesFromSystemHttpService: EntitiesFromSystemHttpService,
    private readonly confirmationService: ConfirmationService,
    private readonly utilsService: UtilsService,
  ) {
    this.entitiesFromSystemHttpService.pagination
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((p) => {
        this.paginator = p;
      });
  }

  ngOnInit(): void {
    this.getAll();
  }

  public onPaginate($event: PaginatorState): void {
    this.entitiesFromSystemHttpService.paginate({
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
      ParameterRoute.entitiesFromSystem,
      EntityFromSystemRoute.create,
    ]);
  }

  public deleteQuestion(d: IEntityFromSystemModel): void {
    this.confirmationService.confirm({
      ...ConfirmationServiceConfig,
      message: `¿Estás seguro de eliminar entidad del sistema ${d.id}?`,
      accept: () => this.delete(d),
      reject: () => {
        //
      },
    });
  }

  public async edit(d: IEntityFromSystemModel): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.parameters,
      ParameterRoute.entitiesFromSystem,
      EntityFromSystemRoute.editWithOutSuffix,
      d.id,
    ]);
  }

  public getAll(): void {
    this.entitiesFromSystemHttpService
      .getAll(this.paginator)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value) => {
          if (value.body?.data && value.body.data.length > 0) {
            this.entitiesFromSystem = value.body?.data ?? [];
          }
        },
      });
  }

  private delete(d: IEntityFromSystemModel): void {
    this.entitiesFromSystemHttpService
      .destroy(d.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (_) => {
          this.filter(d.id);
        },
      });
  }

  private filter(id: number | undefined): void {
    this.entitiesFromSystem = this.entitiesFromSystem.filter(
      (d) => d.id !== id,
    );
  }
}
