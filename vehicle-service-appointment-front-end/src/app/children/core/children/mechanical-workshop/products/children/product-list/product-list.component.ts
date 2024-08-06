import { Component, DestroyRef, OnInit } from '@angular/core';
import { TableComponent } from '@app/shared/components/children/table/table.component';
import { IColumnModel } from '@app/shared/models';
import {
  AppRoute,
  CoreRoute,
  MechanicalWorkshopRoute,
  ProductRoute,
  SelectionModeEnum,
} from '@app/shared/enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginatorState } from 'primeng/paginator';
import { ProductsHttpService } from '@app/children/core/children/mechanical-workshop/products/services';
import { AsyncPipe } from '@angular/common';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { UtilsService } from '@app/shared/services';
import { IProductModel } from '@app/children/core/children/mechanical-workshop/products/models';
import { Router } from '@angular/router';
import { ConfirmationServiceConfig } from '@app/shared/config';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [TableComponent, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  public products: IProductModel[] = [];
  public readonly columns: IColumnModel[] = [
    {
      header: '#',
      field: 'id',
    },
    {
      header: 'Frecuencia daño',
      field: 'damage_frequency',
    },
    {
      header: 'Nombre',
      field: 'name',
    },
    {
      header: 'Precio de venta',
      field: 'sale_price',
    },
    {
      header: 'Estado',
      field: 'status',
    },
  ];
  public paginator = this.productsHttpService.paginator;
  public readonly menuItems: MenuItem[] = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: async (event) => {
        const index = this.utilsService.dataRow(event);
        if (!isNaN(index) && index >= 0) {
          const data = this.products[index];
          await this.edit(data);
        }
      },
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: (event) => {
        const index = this.utilsService.dataRow(event);
        if (!isNaN(index) && index >= 0) {
          const data = this.products[index];
          this.deleteQuestion(data);
        }
      },
    },
  ];
  protected readonly SelectionModeEnum = SelectionModeEnum;

  constructor(
    private readonly destroyRef: DestroyRef,
    public readonly productsHttpService: ProductsHttpService,
    public readonly utilsService: UtilsService,
    private readonly router: Router,
    private readonly confirmationService: ConfirmationService,
  ) {
    this.productsHttpService.pagination
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((p) => {
        this.paginator = p;
      });
  }

  ngOnInit(): void {
    this.getAll();
  }

  public onPaginate($event: PaginatorState): void {
    this.productsHttpService.paginate({
      ...this.paginator,
      page: $event.page ?? 0,
    });
    this.getAll();
  }

  public getAll(): void {
    this.productsHttpService
      .getAll(this.paginator)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.body?.data && res.body.data.length > 0) {
            this.products = res.body?.data ?? [];
          }
        },
      });
  }

  async create(): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.mechanicalWorkshop,
      MechanicalWorkshopRoute.products,
      ProductRoute.create,
    ]);
  }

  private async edit(data: IProductModel): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.mechanicalWorkshop,
      MechanicalWorkshopRoute.products,
      ProductRoute.editWithOutSuffix,
      data.id,
    ]);
  }

  private deleteQuestion(data: IProductModel): void {
    this.confirmationService.confirm({
      ...ConfirmationServiceConfig,
      message: `¿Estás seguro de eliminar producto ${data.id}?`,
      accept: () => this.delete(data),
      reject: () => {
        //
      },
    });
  }

  private delete(d: IProductModel): void {
    this.productsHttpService
      .destroy(d.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (_) => {
          this.getAll();
        },
      });
  }
}
