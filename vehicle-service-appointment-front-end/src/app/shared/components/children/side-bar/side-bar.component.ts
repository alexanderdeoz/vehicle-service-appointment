import { Component, ElementRef, Input } from '@angular/core';
import { MenuComponent } from '@app/shared/components/children/menu/menu.component';
import { MenuItem } from 'primeng/api';
import { CookiesService } from '@app/services/storage';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { NgForOf } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { UserStatus } from '@app/shared/enum';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    MenuComponent,
    AvatarModule,
    DividerModule,
    ChipModule,
    NgForOf,
    TagModule,
  ],
  template: `
    <div class="flex flex-row pt-4 pb-1 gap-2">
      <div class="flex flex-column gap-2">
        <p-avatar styleClass="mr-2 text-primary" size="xlarge" shape="circle">
          {{ getPhoto }}
        </p-avatar>
        <p-tag
          [severity]="UserStatus.ACTIVE ? 'success' : 'secondary'"
          [value]="cookiesService.user.status"
        />
      </div>
      <div class="flex flex-column gap-3">
        <div class="flex flex-column gap-1">
          <span>{{ cookiesService.user.name }}</span>
          <small>{{ cookiesService.user.identification }}</small>
          <span class="font-bold">{{ cookiesService.user.email }}</span>
        </div>
        <p-chip *ngFor="let r of roles" [label]="r" [alt]="r" />
      </div>
    </div>
    <p-divider />
    <app-menu [options]="options" />
  `,
})
export class SideBarComponent {
  @Input() options: MenuItem[] = [];
  protected readonly UserStatus = UserStatus;

  constructor(
    public readonly el: ElementRef,
    public readonly cookiesService: CookiesService,
  ) {}

  public get getPhoto(): string | undefined {
    return `${this.cookiesService.user.name}`.at(0);
  }

  public get roles(): (string | undefined)[] | undefined {
    return this.cookiesService.roles?.map((r) => r.role?.name);
  }
}
