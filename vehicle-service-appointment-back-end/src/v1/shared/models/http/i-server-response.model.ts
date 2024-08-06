import { IResponseMessageModel } from '@v1/shared/models';
import { ReadPaginationDto } from '@v1/shared/dto';

export class IServerResponseModel<D> {
  data?: D;
  pagination?: ReadPaginationDto;
  message?: IResponseMessageModel;
}
