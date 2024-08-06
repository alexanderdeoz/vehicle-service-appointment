import { Component, DestroyRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppRoute, AuthRoute, UserStatus } from '@app/shared/enum';
import { Router, RouterLink } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { Button } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { DividerModule } from 'primeng/divider';
import { ErrorMessageDirective } from '@app/shared/directives';
import { NgIf } from '@angular/common';
import { ILoginRequestModel } from '@app/children/auth/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsersHttpService } from '@app/children/core/children/parameters/users/services';
import { RoleType } from '@app/children/core/children/parameters/roles/enum';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    PasswordModule,
    Button,
    RouterLink,
    ReactiveFormsModule,
    ChipsModule,
    DividerModule,
    ErrorMessageDirective,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public readonly form = this.newForm;
  public readonly loginLink: string = `/${AppRoute.auth}/${AuthRoute.login}`;

  constructor(
    private readonly router: Router,
    private readonly usersHttpService: UsersHttpService,
    private readonly destroyRef: DestroyRef,
  ) {}

  public get emailField(): FormControl {
    return this.form.controls['email'] as FormControl;
  }

  public get passwordField(): FormControl {
    return this.form.controls['password'] as FormControl;
  }

  public get nameField(): FormControl {
    return this.form.controls['name'] as FormControl;
  }

  public get birth_dateField(): FormControl {
    return this.form.controls['birth_date'] as FormControl;
  }

  public get addressField(): FormControl {
    return this.form.controls['address'] as FormControl;
  }

  public get identificationField(): FormControl {
    return this.form.controls['identification'] as FormControl;
  }

  public get phoneField(): FormControl {
    return this.form.controls['phone'] as FormControl;
  }

  private get newForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      status: new FormControl(UserStatus.ACTIVE, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      birth_date: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      role: new FormControl(RoleType.CUSTOMER, [Validators.required]),
      identification: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
    });
  }

  public async onsubmit(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.register();
    }
  }

  private register(): void {
    const form = {
      ...this.form.value,
    } as ILoginRequestModel;
    this.usersHttpService
      .create(form)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async (_) => {
          await this.router.navigate(['/', AppRoute.auth, AuthRoute.login]);
        },
      });
  }
}
