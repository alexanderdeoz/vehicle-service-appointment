import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AbstractHttpService } from '@app/shared/abstracts';
import { IAppointmentModel } from '@app/children/core/children/scheduling/appointments/models';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsHttpService extends AbstractHttpService<IAppointmentModel> {
  public override readonly resourcePath =
    environment.API_DOMAIN.concat('appointments');

  constructor() {
    super();
  }

  public urlReportStatus(uri: string): string {
    return `${this.resourcePath}/report-status${uri}`;
  }

  public urlReportProductsRequest(uri: string): string {
    return `${this.resourcePath}/report-products-request${uri}`;
  }
}
