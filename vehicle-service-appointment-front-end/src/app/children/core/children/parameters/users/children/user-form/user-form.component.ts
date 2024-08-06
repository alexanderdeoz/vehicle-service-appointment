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
import {
  AppRoute,
  CoreRoute,
  ParameterRoute,
  UserStatus,
  UserStatusList,
} from '@app/shared/enum';
import { UsersHttpService } from '@app/children/core/children/parameters/users/services';
import { CalendarModule } from 'primeng/calendar';
import { ErrorMessageDirective } from '@app/shared/directives';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { IRoleModel } from '@app/children/core/children/parameters/roles/models';
import { RolesHttpService } from '@app/children/core/children/parameters/roles/services';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    AsyncPipe,
    Button,
    CardModule,
    NgIf,
    ReactiveFormsModule,
    ToolbarModule,
    CalendarModule,
    ErrorMessageDirective,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  public readonly form: FormGroup = this.newForm;
  public id?: number = undefined;
  public title: string = 'Creando usuario';
  public userStatusList: UserStatus[] = UserStatusList;
  protected roleTypeList: IRoleModel[] = [];

  constructor(
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    private readonly activatedRoute: ActivatedRoute,
    public readonly usersHttpService: UsersHttpService,
    public readonly rolesHttpService: RolesHttpService,
  ) {}

  public get email(): FormControl {
    return this.form.controls['email'] as FormControl;
  }

  public get password(): FormControl {
    return this.form.controls['password'] as FormControl;
  }

  public get status(): FormControl {
    return this.form.controls['status'] as FormControl;
  }

  public get name(): FormControl {
    return this.form.controls['name'] as FormControl;
  }

  public get birth_date(): FormControl {
    return this.form.controls['birth_date'] as FormControl;
  }

  public get address(): FormControl {
    return this.form.controls['address'] as FormControl;
  }

  public get roles(): FormControl {
    return this.form.controls['roles'] as FormControl;
  }

  public get identification(): FormControl {
    return this.form.controls['identification'] as FormControl;
  }

  public get phone(): FormControl {
    return this.form.controls['phone'] as FormControl;
  }

  private get newForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, []),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      birth_date: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      roles: new FormControl(null, [Validators.required]),
      identification: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.handleParams();
    this.getAllRoles();
  }

  handleParams() {
    if (!isNaN(this.activatedRoute.snapshot.params['id'])) {
      this.id = parseInt(this.activatedRoute.snapshot.params['id']);
      this.title = 'Editando usuario';
      this.getOne();
    }
  }

  public getOne() {
    this.usersHttpService
      .getOne(this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.body?.data) {
            this.form.reset(res.body.data);
            if (res.body?.data?.birth_date) {
              this.birth_date.reset(new Date(res.body.data.birth_date));
            }
            if (res.body?.data?.roles) {
              this.roles.reset(res.body.data.roles.map((r) => r?.role?.id));
            }
          }
        },
      });
  }

  public async backToList(): Promise<void> {
    await this.router.navigate([
      '/',
      AppRoute.core,
      CoreRoute.parameters,
      ParameterRoute.users,
    ]);
  }

  public submit(): void {
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
    const form = {
      id: this.id,
      email: this.email.value,
      password: this.password.value,
      status: this.status.value,
      name: this.name.value,
      birth_date: new Date(this.birth_date.value).toISOString(),
      address: this.address.value,
      roles: (this.roles.value ?? []).map((r: number) => ({
        role: { id: r },
        user: { id: this.id },
      })),
      identification: this.identification.value,
      phone: this.phone.value,
    };
    this.usersHttpService
      .update(this.id, form)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async (res) => {
          if (res.ok) {
            await this.router.navigate([
              '/',
              AppRoute.core,
              CoreRoute.parameters,
              ParameterRoute.users,
            ]);
          }
        },
      });
  }

  private create(): void {
    const form = {
      email: this.email.value,
      password: this.password.value,
      status: this.status.value,
      name: this.name.value,
      birth_date: new Date(this.birth_date.value).toISOString(),
      address: this.address.value,
      roles: (this.roles.value ?? []).map((r: number) => ({
        role: { id: r },
      })),
      identification: this.identification.value,
      phone: this.phone.value,
    };
    this.usersHttpService
      .create(form)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async (res) => {
          if (res.ok) {
            await this.router.navigate([
              '/',
              AppRoute.core,
              CoreRoute.parameters,
              ParameterRoute.users,
            ]);
          }
        },
      });
  }

  private getAllRoles(): void {
    this.rolesHttpService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.roleTypeList = res.body?.data ?? [];
        },
      });
  }
}
