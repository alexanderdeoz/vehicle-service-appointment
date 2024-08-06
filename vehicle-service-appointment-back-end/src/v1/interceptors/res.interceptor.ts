import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IServerResponseModel } from '@v1/shared/models';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(_: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((res?: IServerResponseModel<any>) => {
        return {
          data: res?.data,
          pagination: res?.pagination,
          message: res?.message,
        };
      }),
    );
  }
}
