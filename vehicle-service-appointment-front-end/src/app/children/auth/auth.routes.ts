import { Routes } from '@angular/router';
import { AuthRoute } from '@app/shared/enum/routes/auth/auth-route';
import { AuthComponent } from '@app/children/auth/auth.component';

export const AuthRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: AuthRoute.login,
        loadComponent: () =>
          import('@app/children/auth/children/login/login.component').then(
            (c) => c.LoginComponent,
          ),
      },
      {
        path: AuthRoute.register,
        loadComponent: () =>
          import(
            '@app/children/auth/children/register/register.component'
          ).then((c) => c.RegisterComponent),
      },
      {
        path: AuthRoute.forgotPassword,
        loadComponent: () =>
          import(
            '@app/children/auth/children/forgot-password/forgot-password.component'
          ).then((c) => c.ForgotPasswordComponent),
      },
    ],
  },
];
