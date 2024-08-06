import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ActivatedRoute } from '@angular/router';
import { VehiclesHttpService } from '@app/children/core/children/mechanical-workshop/vehicles/services';
import { IVehicleModel } from '@app/children/core/children/mechanical-workshop/vehicles/models';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-vehicle-report-status',
  standalone: true,
  imports: [
    CardModule,
    ToolbarModule,
    AsyncPipe,
    Button,
    NgIf,
    TableModule,
    DatePipe,
  ],
  templateUrl: './vehicle-report-status.component.html',
  styleUrl: './vehicle-report-status.component.scss',
})
export class VehicleReportStatusComponent implements OnInit {
  public id?: number = undefined;
  protected title: string = 'Reporte de estados de vehículo';
  protected vehicle?: IVehicleModel = {};

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    protected readonly vehiclesHttpService: VehiclesHttpService,
  ) {}

  ngOnInit(): void {
    this.handleParams();
    this.getReportAllStatus();
  }

  handleParams() {
    if (!isNaN(this.activatedRoute.snapshot.params['id'])) {
      this.id = parseInt(this.activatedRoute.snapshot.params['id']);
      this.title = 'Reporte de estados de vehículo ' + this.id;
      // this.getOne();
    }
  }

  public getReportAllStatus(): void {
    this.vehiclesHttpService.getReportAllStatus(this.id).subscribe({
      next: (res) => {
        this.vehicle = res.body?.data;
      },
    });
  }
}
