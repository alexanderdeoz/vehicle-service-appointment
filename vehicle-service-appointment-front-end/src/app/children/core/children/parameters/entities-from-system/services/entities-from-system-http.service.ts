import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AbstractHttpService } from '@app/shared/abstracts';
import { IEntityFromSystemModel } from '@app/children/core/children/parameters/entities-from-system/models/i-entity-from-system.model';
import { IHttpResponseModel } from '@app/shared/models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EntitiesFromSystemHttpService extends AbstractHttpService<IEntityFromSystemModel> {
  public override readonly resourcePath = environment.API_DOMAIN.concat(
    'entities-from-system',
  );

  constructor() {
    super();
  }

  public findAllMenuOption() {
    return this.httpClient
      .get<IHttpResponseModel<IEntityFromSystemModel[]>>(
        `${this.resourcePath}/menu-options`,
        {
          observe: 'response',
        },
      )
      .pipe(
        catchError((err, caught) => this.coreService.renderError(err, caught)),
      );
  }
}
