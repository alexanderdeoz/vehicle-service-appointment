import { Component, DestroyRef } from '@angular/core';
import { TableComponent } from '@app/shared/components/children/table/table.component';
import { IColumnModel } from '@app/shared/models';
import {
  AppRoute,
  CoreRoute,
  MechanicalWorkshopRoute,
  SelectionModeEnum,
  VehicleRoute,
} from '@app/shared/enum';
import { IVehicleModel } from '@app/children/core/children/mechanical-workshop/vehicles/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginatorState } from 'primeng/paginator';
import { VehiclesHttpService } from '@app/children/core/children/mechanical-workshop/vehicles/services';
import { AsyncPipe } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { UtilsService } from '@app/shared/services';
import { IUserModel } from '@app/children/core/children/parameters/users/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [TableComponent, AsyncPipe],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent {
  public vehicles: IVehicleModel[] = [];
  public readonly columns: IColumnModel[] = [
    {
      header: '#',
      field: 'id',
    },
    {
      header: 'Placa',
      field: 'plate',
    },
    {
      header: 'Marca',
      field: 'brand',
    },
    {
      header: 'Modelo',
      field: 'model',
    },
    {
      header: 'Tipo de combustible',
      field: 'fuel',
    },
    {
      header: 'Kilometraje',
      field: 'mileage',
    },
    {
      header: 'Estado',
      field: 'status',
    },
    {
      header: 'Lugar de fabricación',
      field: 'made_in',
    },
    {
      header: 'Garantía hasta',
      field: 'warranty_up_to',
    },
    {
      header: 'Fecha próxima revisión',
      field: 'next_review_at',
    },
    {
      header: 'Creado',
      field: 'created_at',
    },
  ];
  public paginator = this.vehiclesHttpService.paginator;
  public readonly menuItems: MenuItem[] = [
    {
      label: 'Reporte de estados',
      icon: 'pi pi-pencil',
      command: async (event) => {
        const index = this.utilsService.dataRow(event);
        if (!isNaN(index) && index >= 0) {
          const data = this.vehicles[index];
          await this.vehicleReportStatus(data);
        }
      },
    },
  ];
  protected readonly SelectionModeEnum = SelectionModeEnum;

  constructor(
    private readonly destroyRef: DestroyRef,
    public readonly vehiclesHttpService: VehiclesHttpService,
    private readonly utilsService: UtilsService,
    private readonly router: Router,
  ) {
    this.vehiclesHttpService.pagination
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((p) => {
        this.paginator = p;
      });
  }

  ngOnInit(): void {
    this.getAll();
  }

  public onPaginate($event: PaginatorState): void {
    this.vehiclesHttpService.paginate({
      ...this.paginator,
      page: $event.page ?? 0,
    });
    this.getAll();
  }

  public getAll(): void {
    this.vehiclesHttpService
      .getAll(this.paginator)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.body?.data && res.body.data.length > 0) {
            this.vehicles = res.body?.data ?? [];
          }
        },
      });
  }

  public async vehicleReportStatus(d: IUserModel): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.mechanicalWorkshop,
      MechanicalWorkshopRoute.vehicles,
      VehicleRoute.vehicleReportStatusWithoutSuffix,
      d.id,
    ]);
  }
}
