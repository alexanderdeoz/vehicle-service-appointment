import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {
  IEntityModel,
  IHttpResponseModel,
  IPaginatorModel,
} from '@app/shared/models';
import { CoreService } from '@app/shared/services';

type EntityListResponseType<T> = T[];

@Injectable({
  providedIn: 'root',
})
export class AbstractHttpService<T extends IEntityModel> {
  public readonly httpClient: HttpClient = inject(HttpClient);
  public readonly coreService: CoreService = inject(CoreService);
  /** Se debe reescribir el path del recurso a usar.
   */
  public readonly resourcePath: string = '';

  public readonly pagination = new BehaviorSubject<IPaginatorModel>(
    this.paginator,
  );

  public readonly loadedGetAll = new BehaviorSubject<boolean>(true);
  public readonly loadedGetAllWithoutPagination = new BehaviorSubject<boolean>(
    true,
  );
  public readonly loadedGetOne = new BehaviorSubject<boolean>(true);
  public readonly loadedUpdate = new BehaviorSubject<boolean>(true);
  public readonly loadedCreate = new BehaviorSubject<boolean>(true);
  public readonly loadedDestroy = new BehaviorSubject<boolean>(true);

  get paginator(): IPaginatorModel {
    return this.coreService.paginator;
  }

  public paginate(paginator: IPaginatorModel): void {
    this.pagination.next(paginator);
  }

  public getAll(
    paginator?: IPaginatorModel,
    search?: string,
    params?: {
      [param: string]:
        | string
        | number
        | boolean
        | ReadonlyArray<string | number | boolean>;
    },
    headers?: HttpHeaders,
  ): Observable<HttpResponse<IHttpResponseModel<EntityListResponseType<T>>>> {
    this.loadedGetAll.next(false);

    let httpParams: HttpParams = new HttpParams().appendAll({
      search: search ?? '',
      ...params,
      ...paginator,
    });

    return this.httpClient
      .get<IHttpResponseModel<EntityListResponseType<T>>>(this.resourcePath, {
        observe: 'response',
        params: httpParams,
        headers,
      })
      .pipe(
        tap<HttpResponse<IHttpResponseModel<EntityListResponseType<T>>>>({
          next: (
            response: HttpResponse<
              IHttpResponseModel<EntityListResponseType<T>>
            >,
          ) => {
            this.loadedGetAll.next(true);
            if (response.body?.pagination) {
              this.pagination.next(response.body.pagination);
            }
          },
          error: (_) => {
            this.loadedGetAll.next(true);
          },
        }),
        catchError((err, caught) => this.coreService.renderError(err, caught)),
      );
  }

  public findAllWithoutPagination(
    params?: {
      [param: string]:
        | string
        | number
        | boolean
        | ReadonlyArray<string | number | boolean>;
    },
    headers?: HttpHeaders,
  ): Observable<HttpResponse<IHttpResponseModel<EntityListResponseType<T>>>> {
    this.loadedGetAllWithoutPagination.next(false);

    let httpParams: HttpParams = new HttpParams().appendAll({
      ...params,
    });

    return this.httpClient
      .get<IHttpResponseModel<EntityListResponseType<T>>>(
        `${this.resourcePath}/without-pagination`,
        {
          observe: 'response',
          params: httpParams,
          headers,
        },
      )
      .pipe(
        tap<HttpResponse<IHttpResponseModel<EntityListResponseType<T>>>>({
          next: (
            _: HttpResponse<IHttpResponseModel<EntityListResponseType<T>>>,
          ) => {
            this.loadedGetAllWithoutPagination.next(true);
          },
          error: (_) => {
            this.loadedGetAllWithoutPagination.next(true);
          },
        }),
        catchError((err, caught) => this.coreService.renderError(err, caught)),
      );
  }

  public create(
    body: IEntityModel | Object | undefined,
    params?: HttpParams,
    headers?: HttpHeaders,
  ): Observable<HttpResponse<IHttpResponseModel<T>>> {
    this.loadedCreate.next(false);
    return this.httpClient
      .post<IHttpResponseModel<T>>(this.resourcePath, body, {
        observe: 'response',
        headers,
        params,
      })
      .pipe(
        tap<HttpResponse<IHttpResponseModel<T>>>({
          next: (_: HttpResponse<IHttpResponseModel<T>>) => {
            this.loadedCreate.next(true);
          },
          error: (_) => {
            this.loadedCreate.next(true);
          },
        }),
        catchError((err, caught) => this.coreService.renderError(err, caught)),
      );
  }

  public getOne(
    id: number | null = null,
    params?: HttpParams,
    headers?: HttpHeaders,
  ): Observable<HttpResponse<IHttpResponseModel<T>>> {
    this.loadedGetOne.next(false);
    const url = `${this.resourcePath}/${id ? id : ''}`;
    return this.httpClient
      .get<IHttpResponseModel<T>>(url, {
        observe: 'response',
        params,
        headers,
      })
      .pipe(
        tap<HttpResponse<IHttpResponseModel<T>>>({
          next: (_: HttpResponse<IHttpResponseModel<T>>) => {
            this.loadedGetOne.next(true);
          },
          error: (_) => {
            this.loadedGetOne.next(true);
          },
        }),
        catchError((err, caught) => this.coreService.renderError(err, caught)),
      );
  }

  public update(
    id: number | undefined,
    body: IEntityModel | Object | undefined,
    params?: HttpParams,
    headers?: HttpHeaders,
  ): Observable<HttpResponse<IHttpResponseModel<T>>> {
    this.loadedUpdate.next(false);
    const url = `${this.resourcePath}/${id ? id : ''}`;
    return this.httpClient
      .patch<IHttpResponseModel<T>>(url, body, {
        observe: 'response',
        params,
        headers,
      })
      .pipe(
        tap<HttpResponse<IHttpResponseModel<T>>>({
          next: (_: HttpResponse<IHttpResponseModel<T>>) => {
            this.loadedUpdate.next(true);
          },
          error: (_) => {
            this.loadedUpdate.next(true);
          },
        }),
        catchError((err, caught) => this.coreService.renderError(err, caught)),
      );
  }

  public destroy(
    id: number | undefined,
    params?: HttpParams,
    headers?: HttpHeaders,
  ): Observable<HttpResponse<IHttpResponseModel<T>>> {
    this.loadedDestroy.next(false);
    const url = `${this.resourcePath}/${id ? id : ''}`;
    return this.httpClient
      .delete<IHttpResponseModel<T>>(url, {
        observe: 'response',
        params,
        headers,
      })
      .pipe(
        tap<HttpResponse<IHttpResponseModel<T>>>({
          next: (_: HttpResponse<IHttpResponseModel<T>>) => {
            this.loadedDestroy.next(true);
          },
          error: (_) => {
            this.loadedDestroy.next(true);
          },
        }),
        catchError((err, caught) => this.coreService.renderError(err, caught)),
      );
  }
}
