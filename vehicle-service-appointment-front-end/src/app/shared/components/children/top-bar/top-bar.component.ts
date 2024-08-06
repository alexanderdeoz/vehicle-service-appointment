import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '@app/shared/services';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppRoute, CoreRoute } from '@app/shared/enum';
import { SessionService } from '@app/services';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [NgClass, RouterLink],
  template: `
    <div
      class="layout-topbar"
      style="box-shadow: 0px 0px 300px 0px var(--primary-200);"
    >
      <a class="layout-topbar-logo" [routerLink]="routeHome">
        <img alt="logo de la empresa" class="w-full sm:w-5rem" src="logo.jpg" />
        <span>Citas de servicio vehícular</span>
      </a>

      <button
        #menuButton
        class="p-link layout-menu-button layout-topbar-button"
        (click)="layoutService.onMenuToggle()"
      >
        <i class="pi pi-bars"></i>
      </button>

      <button
        #topBarMenuButton
        class="p-link layout-topbar-menu-button layout-topbar-button"
        (click)="layoutService.showProfileSidebar()"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <div
        #topBarMenu
        class="layout-topbar-menu"
        [ngClass]="{
          'layout-topbar-menu-mobile-active':
            layoutService.state.profileSidebarVisible,
        }"
      >
        <button class="p-link layout-topbar-button" (click)="logout()">
          <i class="pi pi-sign-out"></i>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  `,
})
export class TopBarComponent {
  items!: MenuItem[];

  @ViewChild('menuButton') menuButton!: ElementRef;

  @ViewChild('topBarMenuButton') topBarMenuButton!: ElementRef;

  @ViewChild('topBarMenu') menu!: ElementRef;
  public readonly routeHome: string[] = [
    '/',
    AppRoute.core,
    CoreRoute.dashboard,
  ];

  constructor(
    public readonly layoutService: LayoutService,
    private readonly sessionService: SessionService,
  ) {}

  logout() {
    this.sessionService.onQuestionLogout();
  }
}
