import { Component, DestroyRef, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PrimeTemplate } from 'primeng/api';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { Button } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsHttpService } from '@app/children/core/children/mechanical-workshop/products/services';
import { AppRoute, CoreRoute, MechanicalWorkshopRoute } from '@app/shared/enum';
import { ErrorMessageDirective } from '@app/shared/directives';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { ProductStatusList } from '@app/children/core/children/mechanical-workshop/products/enum';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CardModule,
    PrimeTemplate,
    ReactiveFormsModule,
    AsyncPipe,
    Button,
    NgIf,
    ToolbarModule,
    ErrorMessageDirective,
    ChipsModule,
    DropdownModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  public readonly form: FormGroup = this.newForm;
  public title: string = 'Creando producto';
  public id: number = 0;
  protected readonly productStatusList = ProductStatusList;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    protected readonly productsHttpService: ProductsHttpService,
    private readonly destroyRef: DestroyRef,
    private readonly router: Router,
  ) {}

  protected get id_field(): FormControl {
    return this.form.controls['id'] as FormControl;
  }

  protected get name_field(): FormControl {
    return this.form.controls['name'] as FormControl;
  }

  protected get sale_price_field(): FormControl {
    return this.form.controls['sale_price'] as FormControl;
  }

  protected get path_photo_field(): FormControl {
    return this.form.controls['path_photo'] as FormControl;
  }

  protected get status_field(): FormControl {
    return this.form.controls['status'] as FormControl;
  }

  private get newForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, []),
      damage_frequency: new FormControl(null, []),
      name: new FormControl(null, [Validators.required]),
      sale_price: new FormControl(null, [Validators.required]),
      path_photo: new FormControl(null, []),
      status: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.handleParams();
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.id) {
        this.update();
      } else {
        this.create();
      }
    }
  }

  handleParams() {
    if (!isNaN(this.activatedRoute.snapshot.params['id'])) {
      this.id = parseInt(this.activatedRoute.snapshot.params['id']);
      this.title = 'Editando producto';
      this.getOne();
    }
  }

  public getOne() {
    this.productsHttpService
      .getOne(this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.form.reset(res.body?.data);
        },
      });
  }

  public async backToList(): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.mechanicalWorkshop,
      MechanicalWorkshopRoute.products,
    ]);
  }

  private update(): void {
    const payload = {
      name: this.name_field.value,
      sale_price: this.sale_price_field.value,
      status: this.status_field.value,
    };
    this.productsHttpService
      .update(this.id, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async (res) => {
          if (res.ok) {
            await this.router.navigate([
              '/',
              AppRoute.core,
              CoreRoute.mechanicalWorkshop,
              MechanicalWorkshopRoute.products,
            ]);
          }
        },
      });
  }

  private create(): void {
    const payload = {
      name: this.name_field.value,
      sale_price: this.sale_price_field.value,
      status: this.status_field.value,
    };
    this.productsHttpService
      .create(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async (res) => {
          if (res.ok) {
            await this.router.navigate([
              '/',
              AppRoute.core,
              CoreRoute.mechanicalWorkshop,
              MechanicalWorkshopRoute.products,
            ]);
          }
        },
      });
  }
}
