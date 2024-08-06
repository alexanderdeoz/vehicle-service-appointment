import { IEntityModel } from '@app/shared/models';
import { IProductModel } from '@app/children/core/children/mechanical-workshop/products/models/i-product.model';

export interface IVehiclePartModel extends IEntityModel {
  card_id: number;
  product_id: number;
  repair: boolean;
  repair_product_id: number;
  product: IProductModel;
  repair_product: IProductModel;
}
