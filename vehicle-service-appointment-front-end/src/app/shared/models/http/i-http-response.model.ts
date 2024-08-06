import { Message } from 'primeng/api';
import { IPaginatorModel } from '@app/shared/models/http/i-paginator.model';

export interface IHttpResponseModel<T> {
  data?: T;
  pagination?: IPaginatorModel;
  message?: Message;
}
