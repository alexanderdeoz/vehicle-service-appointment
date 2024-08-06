import { Component, DestroyRef, OnInit } from '@angular/core';
import { TableComponent } from '@app/shared/components/children/table/table.component';
import { IColumnModel } from '@app/shared/models';
import {
  AppRoute,
  BrandRoute,
  CoreRoute,
  MechanicalWorkshopRoute,
  SelectionModeEnum,
} from '@app/shared/enum';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ConfirmationServiceConfig } from '@app/shared/config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { PaginatorState } from 'primeng/paginator';
import { UtilsService } from '@app/shared/services';
import { BrandsHttpService } from '@app/children/core/children/mechanical-workshop/brands/services';
import { IBrandModel } from '@app/children/core/children/mechanical-workshop/brands/models';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [TableComponent, AsyncPipe],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.scss',
})
export class BrandListComponent implements OnInit {
  public brands: IBrandModel[] = [];
  public readonly columns: IColumnModel[] = [
    {
      header: '#',
      field: 'id',
    },
    {
      header: 'Nombre',
      field: 'name',
    },
    {
      header: 'Estado',
      field: 'status',
    },
    {
      header: 'Fecha creación',
      field: 'created_at',
    },
  ];
  public paginator = this.brandsHttpService.paginator;
  public readonly menuItems: MenuItem[] = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: async (event) => {
        const index = this.utilsService.dataRow(event);
        if (!isNaN(index) && index >= 0) {
          const data = this.brands[index];
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
          const data = this.brands[index];
          this.deleteQuestion(data);
        }
      },
    },
  ];
  protected readonly SelectionModeEnum = SelectionModeEnum;

  constructor(
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    public readonly brandsHttpService: BrandsHttpService,
    private readonly confirmationService: ConfirmationService,
    private readonly utilsService: UtilsService,
  ) {
    this.brandsHttpService.pagination
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((p) => {
        this.paginator = p;
      });
  }

  ngOnInit(): void {
    this.getAll();
  }

  public onPaginate($event: PaginatorState): void {
    this.brandsHttpService.paginate({
      ...this.paginator,
      page: $event.page ?? 0,
    });
    this.getAll();
  }

  async create(): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.mechanicalWorkshop,
      MechanicalWorkshopRoute.brands,
      BrandRoute.create,
    ]);
  }

  public deleteQuestion(d: IBrandModel): void {
    this.confirmationService.confirm({
      ...ConfirmationServiceConfig,
      message: `¿Estás seguro de eliminar rol ${d.id}?`,
      accept: () => this.delete(d),
      reject: () => {
        //
      },
    });
  }

  public async edit(d: IBrandModel): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.mechanicalWorkshop,
      MechanicalWorkshopRoute.brands,
      BrandRoute.editWithOutSuffix,
      d.id,
    ]);
  }

  public getAll(): void {
    this.brandsHttpService
      .getAll(this.paginator)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value) => {
          if (value.body?.data && value.body.data.length > 0) {
            this.brands = value.body?.data ?? [];
          }
        },
      });
  }

  private delete(d: IBrandModel): void {
    this.brandsHttpService
      .destroy(d.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (_) => {
          this.filter(d.id);
        },
      });
  }

  private filter(id: number | undefined): void {
    this.brands = this.brands.filter((d) => d.id !== id);
  }
}
