import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AbstractHttpService } from '@app/shared/abstracts';
import { IBrandModel } from '@app/children/core/children/mechanical-workshop/brands/models';

@Injectable({
  providedIn: 'root',
})
export class BrandsHttpService extends AbstractHttpService<IBrandModel> {
  public override readonly resourcePath =
    environment.API_DOMAIN.concat('brands');

  constructor() {
    super();
  }
}
