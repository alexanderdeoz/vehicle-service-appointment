import { IUserModel } from '@app/children/core/children/parameters/users/models';

export interface ILoginResponseModel {
  accessToken?: string;
  user?: IUserModel;
}
