import { Component, DestroyRef, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ErrorMessageDirective } from '@app/shared/directives';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PrimeTemplate } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppRoute, CoreRoute, ParameterRoute } from '@app/shared/enum';
import { EntitiesFromSystemHttpService } from '@app/children/core/children/parameters/entities-from-system/services';
import { EntityFromSystemStatusList } from '@app/children/core/children/parameters/entities-from-system/enum';
import { PermissionsHttpService } from '@app/children/core/children/parameters/permissions/services';
import { IPermissionModel } from '@app/children/core/children/parameters/permissions/models';
import { MultiSelectModule } from 'primeng/multiselect';
import { IEntityFromSystemPermissionModel } from '@app/children/core/children/parameters/entities-from-system/models/i-entity-from-system-permission.model';

@Component({
  selector: 'app-entities-from-system-form',
  standalone: true,
  imports: [
    AsyncPipe,
    Button,
    CardModule,
    DropdownModule,
    ErrorMessageDirective,
    FormsModule,
    InputTextModule,
    NgIf,
    PrimeTemplate,
    ToolbarModule,
    ReactiveFormsModule,
    MultiSelectModule,
  ],
  templateUrl: './entities-from-system-form.component.html',
  styleUrl: './entities-from-system-form.component.scss',
})
export class EntitiesFromSystemFormComponent implements OnInit {
  public readonly form: FormGroup = this.newForm;
  public id: number = 0;
  public title: string = 'Creando entidad del sistema';
  protected readonly entityFromSystemStatusList = EntityFromSystemStatusList;
  protected permissions: IPermissionModel[] = [];

  constructor(
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    private readonly activatedRoute: ActivatedRoute,
    public readonly entitiesFromSystemHttpService: EntitiesFromSystemHttpService,
    public readonly permissionsHttpService: PermissionsHttpService,
  ) {}

  protected get status(): FormControl {
    return this.form.controls['status'] as FormControl;
  }

  protected get name(): FormControl {
    return this.form.controls['name'] as FormControl;
  }

  protected get permissions_field(): FormControl {
    return this.form.controls['permissions'] as FormControl;
  }

  private get newForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, []),
      status: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      permissions: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.handleParams();
    this.getAllPermissions();
  }

  handleParams() {
    if (!isNaN(this.activatedRoute.snapshot.params['id'])) {
      this.id = parseInt(this.activatedRoute.snapshot.params['id']);
      this.title = 'Editando entidad del sistema.';
      this.getOne();
    }
  }

  public getOne() {
    this.entitiesFromSystemHttpService
      .getOne(this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.body?.data) {
            this.form.reset(res.body.data);
            this.permissions_field.reset(
              res.body.data.entityFromSystemPermission?.map(
                (e) => e?.permission?.id,
              ),
            );
          }
        },
      });
  }

  public async backToList(): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.parameters,
      ParameterRoute.entitiesFromSystem,
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
      entityFromSystemPermission: (
        this.permissions_field.value as number[]
      ).map<IEntityFromSystemPermissionModel>((id) => ({
        permission: { id },
      })),
    };
    this.entitiesFromSystemHttpService
      .update(this.id, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async (res) => {
          if (res.ok) {
            await this.backToList();
          }
        },
      });
  }

  private create(): void {
    const payload = {
      name: this.name.value,
      status: this.status.value,
      entityFromSystemPermission: (
        this.permissions_field.value as number[]
      ).map<IEntityFromSystemPermissionModel>((id) => ({
        permission: { id },
      })),
    };
    this.entitiesFromSystemHttpService
      .create(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async (res) => {
          if (res.ok) {
            await this.backToList();
          }
        },
      });
  }

  private getAllPermissions(): void {
    this.permissionsHttpService.getAll().subscribe({
      next: (res) => {
        this.permissions = res.body?.data ?? [];
      },
    });
  }
}
