import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AbstractHttpService } from '@app/shared/abstracts';
import { IFuelModel } from '@app/children/core/children/mechanical-workshop/fuels/models';

@Injectable({
  providedIn: 'root',
})
export class FuelHttpService extends AbstractHttpService<IFuelModel> {
  public override readonly resourcePath =
    environment.API_DOMAIN.concat('fuels');

  constructor() {
    super();
  }
}
