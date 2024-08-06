import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AbstractHttpService } from '@app/shared/abstracts';
import { IModelModel } from '@app/children/core/children/mechanical-workshop/models/models';

@Injectable({
  providedIn: 'root',
})
export class ModelsHttpService extends AbstractHttpService<IModelModel> {
  public override readonly resourcePath =
    environment.API_DOMAIN.concat('models');

  constructor() {
    super();
  }
}
