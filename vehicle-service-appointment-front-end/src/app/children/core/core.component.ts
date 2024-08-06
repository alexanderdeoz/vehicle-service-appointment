import { Component, Renderer2, ViewChild } from '@angular/core';
import { AppMenuitemComponent } from '@app/shared/components/children/menu-item/menu-item.component';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { SideBarComponent } from '@app/shared/components/children/side-bar/side-bar.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '@app/shared/components/children/footer/footer.component';
import { TopBarComponent } from '@app/shared/components/children/top-bar/top-bar.component';
import { LayoutService } from '@app/shared/services';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SideBarService } from '@app/children/core/services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AppMenuitemComponent,
    NgForOf,
    NgIf,
    SideBarComponent,
    RouterOutlet,
    FooterComponent,
    TopBarComponent,
    NgClass,
    AsyncPipe,
  ],
  template: `
    <div class="layout-wrapper" [ngClass]="containerClass">
      <app-top-bar />
      <div class="layout-sidebar bg-primary-900 text-white">
        <app-side-bar [options]="(sideBarService.options$ | async) ?? []" />
      </div>
      <div class="layout-main-container">
        <div class="layout-main">
          <router-outlet></router-outlet>
        </div>
        <app-footer />
      </div>
      <div class="layout-mask"></div>
    </div>
  `,
})
export class DashboardComponent {
  overlayMenuOpenSubscription: Subscription;

  menuOutsideClickListener: any;

  profileMenuOutsideClickListener: any;

  @ViewChild(SideBarComponent) appSidebar!: SideBarComponent;

  @ViewChild(TopBarComponent) appTopBar!: TopBarComponent;

  constructor(
    public readonly sideBarService: SideBarService,
    public readonly layoutService: LayoutService,
    public readonly renderer: Renderer2,
    public readonly router: Router,
  ) {
    this.overlayMenuOpenSubscription =
      this.layoutService.overlayOpen$.subscribe(() => {
        if (!this.menuOutsideClickListener) {
          this.menuOutsideClickListener = this.renderer.listen(
            'document',
            'click',
            (event) => {
              const isOutsideClicked = !(
                this.appSidebar.el.nativeElement.isSameNode(event.target) ||
                this.appSidebar.el.nativeElement.contains(event.target) ||
                this.appTopBar.menuButton.nativeElement.isSameNode(
                  event.target,
                ) ||
                this.appTopBar.menuButton.nativeElement.contains(event.target)
              );

              if (isOutsideClicked) {
                this.hideMenu();
              }
            },
          );
        }

        if (!this.profileMenuOutsideClickListener) {
          this.profileMenuOutsideClickListener = this.renderer.listen(
            'document',
            'click',
            (event) => {
              const isOutsideClicked = !(
                this.appTopBar.menu.nativeElement.isSameNode(event.target) ||
                this.appTopBar.menu.nativeElement.contains(event.target) ||
                this.appTopBar.topBarMenuButton.nativeElement.isSameNode(
                  event.target,
                ) ||
                this.appTopBar.topBarMenuButton.nativeElement.contains(
                  event.target,
                )
              );

              if (isOutsideClicked) {
                this.hideProfileMenu();
              }
            },
          );
        }

        if (this.layoutService.state.staticMenuMobileActive) {
          this.blockBodyScroll();
        }
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.hideMenu();
        this.hideProfileMenu();
      });
  }

  get containerClass() {
    return {
      'layout-theme-light': this.layoutService.config().colorScheme === 'light',
      'layout-theme-dark': this.layoutService.config().colorScheme === 'dark',
      'layout-overlay': this.layoutService.config().menuMode === 'overlay',
      'layout-static': this.layoutService.config().menuMode === 'static',
      'layout-static-inactive':
        this.layoutService.state.staticMenuDesktopInactive &&
        this.layoutService.config().menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config().inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config().ripple,
    };
  }

  hideMenu() {
    this.layoutService.state.overlayMenuActive = false;
    this.layoutService.state.staticMenuMobileActive = false;
    this.layoutService.state.menuHoverActive = false;
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }
    this.unblockBodyScroll();
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi',
        ),
        ' ',
      );
    }
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }

  hideProfileMenu() {
    this.layoutService.state.profileSidebarVisible = false;
    if (this.profileMenuOutsideClickListener) {
      this.profileMenuOutsideClickListener();
      this.profileMenuOutsideClickListener = null;
    }
  }
}
