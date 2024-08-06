import { HttpParams } from '@angular/common/http';

export type HttpHeadersModel =
  | HttpParams
  | {
      [param: string]:
        | string
        | number
        | boolean
        | ReadonlyArray<string | number | boolean>;
    };
