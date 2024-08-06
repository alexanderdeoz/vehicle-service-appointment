import { Component, DestroyRef, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppRoute, CoreRoute, MechanicalWorkshopRoute } from '@app/shared/enum';
import { ErrorMessageDirective } from '@app/shared/directives';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { BrandsHttpService } from '@app/children/core/children/mechanical-workshop/brands/services';
import { BrandStatusList } from '@app/children/core/children/mechanical-workshop/brands/enum';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [
    AsyncPipe,
    Button,
    CardModule,
    NgIf,
    ReactiveFormsModule,
    ToolbarModule,
    ErrorMessageDirective,
    InputTextModule,
    DropdownModule,
  ],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss',
})
export class BrandFormComponent implements OnInit {
  public readonly form: FormGroup = this.newForm;
  public id: number = 0;
  public title: string = 'Creando marca';
  protected readonly brandStatusList = BrandStatusList;

  constructor(
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    private readonly activatedRoute: ActivatedRoute,
    public readonly brandsHttpService: BrandsHttpService,
  ) {}

  protected get status(): FormControl {
    return this.form.controls['status'] as FormControl;
  }

  protected get name(): FormControl {
    return this.form.controls['name'] as FormControl;
  }

  private get newForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, []),
      status: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.handleParams();
  }

  handleParams() {
    if (!isNaN(this.activatedRoute.snapshot.params['id'])) {
      this.id = parseInt(this.activatedRoute.snapshot.params['id']);
      this.title = 'Editando marca';
      this.getOne();
    }
  }

  public getOne() {
    this.brandsHttpService
      .getOne(this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.body?.data) {
            this.form.reset(res.body.data);
          }
        },
      });
  }

  public async backToList(): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.mechanicalWorkshop,
      MechanicalWorkshopRoute.brands,
    ]);
  }

  protected onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.id) {
        this.update();
      } else {
        this.create();
      }
    }
  }

  private update(): void {
    const payload = {
      id: this.id,
      name: this.name.value,
      status: this.status.value,
    };
    this.brandsHttpService
      .update(this.id, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async (res) => {
          if (res.ok) {
            await this.router.navigate([
              '/',
              AppRoute.core,
              CoreRoute.mechanicalWorkshop,
              MechanicalWorkshopRoute.brands,
            ]);
          }
        },
      });
  }

  private create(): void {
    const payload = {
      name: this.name.value,
      status: this.status.value,
    };
    this.brandsHttpService
      .create(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async (res) => {
          if (res.ok) {
            await this.router.navigate([
              '/',
              AppRoute.core,
              CoreRoute.mechanicalWorkshop,
              MechanicalWorkshopRoute.brands,
            ]);
          }
        },
      });
  }
}
