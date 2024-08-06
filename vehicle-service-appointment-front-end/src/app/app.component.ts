import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationToastComponent } from '@app/shared/components/children/notification-toast/notification-toast.component';
import { ConfirmDialogComponent } from '@app/shared/components/children/confirm-dialog/confirm-dialog.component';
import { MainLoadingMaskComponent } from '@app/shared/components/children/main-loading-mask/main-loading-mask.component';
import { LayoutService } from '@app/shared/services';
import { LoadingService } from '@app/services/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NotificationToastComponent,
    ConfirmDialogComponent,
    MainLoadingMaskComponent,
  ],
  template: `
    <app-notification-toast></app-notification-toast>
    <app-confirm-dialog></app-confirm-dialog>
    <app-main-loading-mask></app-main-loading-mask>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  constructor(
    public readonly _: LayoutService,
    public readonly __: LoadingService,
  ) {}
}
