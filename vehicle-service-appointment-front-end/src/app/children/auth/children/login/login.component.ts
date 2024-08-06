import { Component, DestroyRef } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppRoute, AuthRoute, CoreRoute } from '@app/shared/enum';
import { InputTextModule } from 'primeng/inputtext';
import { ILoginRequestModel } from '@app/children/auth/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthHttpService } from '@app/children/auth/services';
import { CookiesService } from '@app/services/storage';
import { ErrorMessageDirective } from '@app/shared/directives';
import { patterns } from '@app/shared/regular-expressions';
import { NgIf } from '@angular/common';
import { ToastMessageService } from '@app/shared/services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PasswordModule,
    CheckboxModule,
    RouterLink,
    Button,
    ReactiveFormsModule,
    InputTextModule,
    ErrorMessageDirective,
    NgIf,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public form: FormGroup = this.newForm;
  public readonly registerLink: string = `/${AppRoute.auth}/${AuthRoute.register}`;
  public readonly forgotPasswordLink: string = `/${AppRoute.auth}/${AuthRoute.forgotPassword}`;

  constructor(
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    private readonly authHttpService: AuthHttpService,
    private readonly cookiesService: CookiesService,
    private readonly toastMessageService: ToastMessageService,
  ) {}

  get newForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),
        Validators.pattern(patterns.email),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255),
      ]),
    });
  }

  public get emailField(): FormControl {
    return this.form.controls['email'] as FormControl;
  }

  public get passwordField(): FormControl {
    return this.form.controls['password'] as FormControl;
  }

  // abstract controls

  public async onsubmit(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.login();
    }
  }

  private login(): void {
    const form = {
      ...this.form.value,
    } as ILoginRequestModel;
    this.authHttpService
      .login(form)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async (res) => {
          const payload = res.body?.data;
          if (payload?.user && payload?.accessToken) {
            this.cookiesService.user = payload.user;
            this.cookiesService.accessToken = payload.accessToken;
            await this.router.navigate([AppRoute.core, CoreRoute.dashboard]);
            this.toastMessageService.success({
              summary: `Bienvenido ${this.cookiesService.user.email}`,
              detail: `${this.cookiesService.user.name}`,
            });
          }
        },
      });
  }
}
