import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AbstractHttpService } from '@app/shared/abstracts';
import { IProductModel } from '@app/children/core/children/mechanical-workshop/products/models';

@Injectable({
  providedIn: 'root',
})
export class ProductsHttpService extends AbstractHttpService<IProductModel> {
  public override readonly resourcePath =
    environment.API_DOMAIN.concat('products');

  constructor() {
    super();
  }
}
