import { Component, DestroyRef, OnInit } from '@angular/core';
import { TableComponent } from '@app/shared/components/children/table/table.component';
import { IColumnModel } from '@app/shared/models';
import {
  AppointmentRoute,
  AppRoute,
  CoreRoute,
  SchedulingRoute,
  SelectionModeEnum,
} from '@app/shared/enum';
import { AppointmentsHttpService } from 'src/app/children/core/children/scheduling/appointments/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IAppointmentModel } from 'src/app/children/core/children/scheduling/appointments/models';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ConfirmationServiceConfig } from '@app/shared/config';
import { Router } from '@angular/router';
import { AsyncPipe, NgForOf } from '@angular/common';
import { PaginatorState } from 'primeng/paginator';
import { Button } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MenuModule } from 'primeng/menu';
import { UtilsService } from '@app/shared/services';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    TableComponent,
    AsyncPipe,
    Button,
    ChipsModule,
    InputTextModule,
    OverlayPanelModule,
    InputGroupModule,
    InputGroupAddonModule,
    NgForOf,
    MenuModule,
  ],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss',
})
export class AppointmentListComponent implements OnInit {
  public appointments: IAppointmentModel[] = [];
  public readonly columns: IColumnModel[] = [
    {
      header: '#',
      field: 'id',
    },
    {
      header: 'Mecánico',
      field: 'mechanic',
    },
    {
      header: 'Cliente',
      field: 'user',
    },
    {
      header: 'Estado',
      field: 'status',
    },
    {
      header: 'Agendado para',
      field: 'scheduled_at',
    },
    {
      header: 'Caducidad en',
      field: 'valid_until_at',
    },
    {
      header: 'Creado en',
      field: 'created_at',
    },
  ];
  public paginator = this.appointmentsHttpService.paginator;
  public readonly menuItems: MenuItem[] = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: async (event) => {
        const index = this.utilsService.dataRow(event);
        if (!isNaN(index) && index >= 0) {
          const data = this.appointments[index];
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
          const data = this.appointments[index];
          this.deleteQuestion(data);
        }
      },
    },
    {
      label: 'Informe de estado',
      icon: 'pi pi-chart-bar',
      command: (event) => {
        const index = this.utilsService.dataRow(event);
        if (!isNaN(index) && index >= 0) {
          const data = this.appointments[index];
          this.reportStatus(data);
        }
      },
    },
    {
      label: 'Solicitud de productos',
      icon: 'pi pi-file',
      command: (event) => {
        const index = this.utilsService.dataRow(event);
        if (!isNaN(index) && index >= 0) {
          const data = this.appointments[index];
          this.reportProductsRequest(data);
        }
      },
    },
  ];
  protected readonly SelectionModeEnum = SelectionModeEnum;

  constructor(
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    public readonly appointmentsHttpService: AppointmentsHttpService,
    private readonly confirmationService: ConfirmationService,
    private readonly utilsService: UtilsService,
  ) {
    this.appointmentsHttpService.pagination
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((p) => {
        this.paginator = p;
      });
  }

  ngOnInit(): void {
    this.getAll();
  }

  public onPaginate($event: PaginatorState): void {
    this.appointmentsHttpService.paginate({
      ...this.paginator,
      page: $event.page ?? 0,
    });
    this.getAll();
  }

  async create(): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.scheduling,
      SchedulingRoute.appointments,
      AppointmentRoute.create,
    ]);
  }

  public deleteQuestion(d: IAppointmentModel): void {
    this.confirmationService.confirm({
      ...ConfirmationServiceConfig,
      message: `¿Estás seguro de eliminar cita ${d.id}?`,
      accept: () => this.delete(d),
      reject: () => {
        //
      },
    });
  }

  public async edit(d: IAppointmentModel): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.scheduling,
      SchedulingRoute.appointments,
      AppointmentRoute.editWithOutSuffix,
      d.id,
    ]);
  }

  public getAll(): void {
    this.appointmentsHttpService
      .getAll(this.paginator)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value) => {
          if (value.body?.data && value.body.data.length > 0) {
            this.appointments = value.body?.data ?? [];
          }
        },
      });
  }

  private delete(d: IAppointmentModel): void {
    this.appointmentsHttpService
      .destroy(d.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (_) => {
          this.getAll();
        },
      });
  }

  private reportStatus(data: IAppointmentModel): void {
    window.open(
      this.appointmentsHttpService.urlReportStatus(`/${data.id}`),
      '_blank',
    );
  }

  private reportProductsRequest(data: IAppointmentModel): void {
    window.open(
      this.appointmentsHttpService.urlReportProductsRequest(`/${data.id}`),
      '_blank',
    );
  }
}
