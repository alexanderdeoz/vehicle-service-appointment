import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@app/shared/components/children/footer/footer.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  template: `
    <div class="min-h-screen max-w-screen">
      <router-outlet />
      <app-footer />
    </div>
  `,
  imports: [RouterOutlet, FooterComponent],
})
export class AuthComponent {}
