import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-notification-toast',
  standalone: true,
  imports: [ToastModule],
  template: `
    <p-toast
      position="top-center"
      [breakpoints]="{ '920px': { width: '100%' } }"
    />
  `,
})
export class NotificationToastComponent {}
