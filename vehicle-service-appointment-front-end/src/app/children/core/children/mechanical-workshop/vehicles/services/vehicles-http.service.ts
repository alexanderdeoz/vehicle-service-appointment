import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AbstractHttpService } from '@app/shared/abstracts';
import { IVehicleModel } from '@app/children/core/children/mechanical-workshop/vehicles/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IHttpResponseModel } from '@app/shared/models';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VehiclesHttpService extends AbstractHttpService<IVehicleModel> {
  public override readonly resourcePath =
    environment.API_DOMAIN.concat('vehicles');
  public readonly loadedGetReportAllStatus = new BehaviorSubject<boolean>(true);

  constructor() {
    super();
  }

  public getReportAllStatus(
    id?: number,
  ): Observable<HttpResponse<IHttpResponseModel<IVehicleModel>>> {
    this.loadedGetReportAllStatus.next(false);
    return this.httpClient
      .get<IHttpResponseModel<IVehicleModel>>(
        `${this.resourcePath}/report-all-status/${id}`,
        {
          observe: 'response',
        },
      )
      .pipe(
        tap<HttpResponse<IHttpResponseModel<IVehicleModel>>>({
          next: (_: HttpResponse<IHttpResponseModel<IVehicleModel>>) => {
            this.loadedGetReportAllStatus.next(true);
          },
          error: (_) => {
            this.loadedGetReportAllStatus.next(true);
          },
        }),
        catchError((err, caught) => this.coreService.renderError(err, caught)),
      );
  }
}
