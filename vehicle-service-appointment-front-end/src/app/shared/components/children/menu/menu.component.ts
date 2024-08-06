import { Component, Input } from '@angular/core';
import { AppMenuitemComponent } from '@app/shared/components/children/menu-item/menu-item.component';
import { NgForOf, NgIf } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AppMenuitemComponent, NgForOf, NgIf],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  @Input() options: MenuItem[] = [];
}
