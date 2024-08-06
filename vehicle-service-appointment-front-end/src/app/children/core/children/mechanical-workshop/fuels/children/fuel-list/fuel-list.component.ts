import { Component, DestroyRef, OnInit } from '@angular/core';
import { TableComponent } from '@app/shared/components/children/table/table.component';
import { IColumnModel } from '@app/shared/models';
import {
  AppRoute,
  CoreRoute,
  FuelRoute,
  MechanicalWorkshopRoute,
  SelectionModeEnum,
} from '@app/shared/enum';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ConfirmationServiceConfig } from '@app/shared/config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { PaginatorState } from 'primeng/paginator';
import { UtilsService } from '@app/shared/services';
import { FuelHttpService } from '@app/children/core/children/mechanical-workshop/fuels/services';
import { IFuelModel } from '@app/children/core/children/mechanical-workshop/fuels/models';

@Component({
  selector: 'app-fuel-list',
  standalone: true,
  imports: [TableComponent, AsyncPipe],
  templateUrl: './fuel-list.component.html',
  styleUrl: './fuel-list.component.scss',
})
export class FuelListComponent implements OnInit {
  public fuels: IFuelModel[] = [];
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
  public paginator = this.fuelHttpService.paginator;
  public readonly menuItems: MenuItem[] = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: async (event) => {
        const index = this.utilsService.dataRow(event);
        if (!isNaN(index) && index >= 0) {
          const data = this.fuels[index];
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
          const data = this.fuels[index];
          this.deleteQuestion(data);
        }
      },
    },
  ];
  protected readonly SelectionModeEnum = SelectionModeEnum;

  constructor(
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    public readonly fuelHttpService: FuelHttpService,
    private readonly confirmationService: ConfirmationService,
    private readonly utilsService: UtilsService,
  ) {
    this.fuelHttpService.pagination
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((p) => {
        this.paginator = p;
      });
  }

  ngOnInit(): void {
    this.getAll();
  }

  public onPaginate($event: PaginatorState): void {
    this.fuelHttpService.paginate({
      ...this.paginator,
      page: $event.page ?? 0,
    });
    this.getAll();
  }

  async create(): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.mechanicalWorkshop,
      MechanicalWorkshopRoute.fuels,
      FuelRoute.create,
    ]);
  }

  public deleteQuestion(d: IFuelModel): void {
    this.confirmationService.confirm({
      ...ConfirmationServiceConfig,
      message: `¿Estás seguro de eliminar combustible ${d.id}?`,
      accept: () => this.delete(d),
      reject: () => {
        //
      },
    });
  }

  public async edit(d: IFuelModel): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.mechanicalWorkshop,
      MechanicalWorkshopRoute.fuels,
      FuelRoute.editWithOutSuffix,
      d.id,
    ]);
  }

  public getAll(): void {
    this.fuelHttpService
      .getAll(this.paginator)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value) => {
          if (value.body?.data && value.body.data.length > 0) {
            this.fuels = value.body?.data ?? [];
          }
        },
      });
  }

  private delete(d: IFuelModel): void {
    this.fuelHttpService
      .destroy(d.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (_) => {
          this.filter(d.id);
        },
      });
  }

  private filter(id: number | undefined): void {
    this.fuels = this.fuels.filter((d) => d.id !== id);
  }
}
