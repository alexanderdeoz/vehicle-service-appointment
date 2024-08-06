import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AbstractHttpService } from '@app/shared/abstracts';
import { IVehicleModel } from '@app/children/core/children/mechanical-workshop/vehicles/models';
import { IHttpResponseModel } from '@app/shared/models';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DataDashboard } from '@app/children/core/models';

@Injectable({
  providedIn: 'root',
})
export class CoreHttpService extends AbstractHttpService<IVehicleModel> {
  public override readonly resourcePath = environment.API_DOMAIN.concat('core');
  public readonly loadedDataDashboard = new BehaviorSubject<boolean>(true);

  constructor() {
    super();
  }

  public dataDashboard(): Observable<
    HttpResponse<IHttpResponseModel<DataDashboard>>
  > {
    this.loadedDataDashboard.next(false);
    return this.httpClient
      .get<IHttpResponseModel<DataDashboard>>(
        `${this.resourcePath}/data-dashboard`,
        {
          observe: 'response',
        },
      )
      .pipe(
        tap<HttpResponse<IHttpResponseModel<DataDashboard>>>({
          next: (response: HttpResponse<IHttpResponseModel<DataDashboard>>) => {
            this.loadedDataDashboard.next(true);
            if (response.body?.pagination) {
              this.pagination.next(response.body.pagination);
            }
          },
          error: (_) => {
            this.loadedDataDashboard.next(true);
          },
        }),
        catchError((err, caught) => this.coreService.renderError(err, caught)),
      );
  }
}
