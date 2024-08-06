import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HttpInterceptorProviders } from '@app/interceptors';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CookieModule, CookieService } from 'ngx-cookie';
import { ToastMessageService } from '@app/shared/services';
import { DialogService } from 'primeng/dynamicdialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(AppRoutes),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors(HttpInterceptorProviders),
      withFetch(),
    ),
    provideAnimations(),
    MessageService,
    ConfirmationService,
    CookieService,
    ToastMessageService,
    ConfirmationService,
    DialogService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    importProvidersFrom(CookieModule.withOptions()),
  ],
};
