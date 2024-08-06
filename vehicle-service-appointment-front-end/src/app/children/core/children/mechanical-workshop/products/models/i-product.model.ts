import { IEntityModel } from '@app/shared/models';

export interface IProductModel extends IEntityModel {
  active?: boolean;
  name?: string;
}
