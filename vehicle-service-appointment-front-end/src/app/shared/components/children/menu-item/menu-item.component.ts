import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: '[app-menuitem]',
  standalone: true,
  template: `
    <ng-container>
      <div
        *ngIf="root && item.visible !== false"
        class="layout-menuitem-root-text text-white hover:bg-primary-800"
      >
        {{ item.label }}
      </div>
      <a
        *ngIf="(!item.routerLink || item.items) && item.visible !== false"
        [attr.href]="item.url"
        (click)="itemClick($event)"
        [ngClass]="item.class"
        [attr.target]="item.target"
        tabindex="0"
        pRipple
        class="hover:bg-primary-800"
      >
        <i [ngClass]="item.icon" class="layout-menuitem-icon text-white"></i>
        <span class="layout-menuitem-text text-white">{{ item.label }}</span>
        <i
          class="pi pi-fw pi-angle-down layout-submenu-toggler"
          *ngIf="item.items"
        ></i>
      </a>
      <a
        *ngIf="item.routerLink && !item.items && item.visible !== false"
        (click)="itemClick($event)"
        [ngClass]="item.class"
        [routerLink]="item.routerLink"
        routerLinkActive="bg-primary-500"
        [routerLinkActiveOptions]="
          item.routerLinkActiveOptions || {
            paths: 'exact',
            queryParams: 'ignored',
            matrixParams: 'ignored',
            fragment: 'ignored',
          }
        "
        [fragment]="item.fragment"
        [queryParamsHandling]="item.queryParamsHandling"
        [preserveFragment]="item.preserveFragment"
        [skipLocationChange]="item.skipLocationChange"
        [replaceUrl]="item.replaceUrl"
        [state]="item.state"
        [queryParams]="item.queryParams"
        [attr.target]="item.target"
        tabindex="0"
        pRipple
        class="hover:bg-primary-800"
      >
        <i [ngClass]="item.icon" class="layout-menuitem-icon text-white"></i>
        <span class="layout-menuitem-text text-white">{{ item.label }}</span>
        <i
          class="pi pi-fw pi-angle-down layout-submenu-toggler"
          *ngIf="item.items"
        ></i>
      </a>

      <ul
        *ngIf="item.items && item.visible !== false"
        [@children]="submenuAnimation"
      >
        <ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
          <li
            app-menuitem
            [item]="child"
            [index]="i"
            [parentKey]="key"
            [class]="child?.badgeClass"
          ></li>
        </ng-template>
      </ul>
    </ng-container>
  `,
  imports: [NgClass, RouterLink, RouterLinkActive, NgForOf, NgIf, Ripple],
  animations: [
    trigger('children', [
      state(
        'collapsed',
        style({
          height: '0',
        }),
      ),
      state(
        'expanded',
        style({
          height: '*',
        }),
      ),
      transition(
        'collapsed <=> expanded',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'),
      ),
    ]),
  ],
})
export class AppMenuitemComponent implements OnInit, OnDestroy {
  @Input() item: any;

  @Input() index!: number;

  @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;

  @Input() parentKey!: string;

  active = false;

  menuSourceSubscription: Subscription;

  menuResetSubscription: Subscription;

  key: string = '';

  private menuSource = new Subject<any>();
  menuSource$ = this.menuSource.asObservable();
  private resetSource = new Subject();
  resetSource$ = this.resetSource.asObservable();

  constructor(public router: Router) {
    this.menuSourceSubscription = this.menuSource$.subscribe((value) => {
      Promise.resolve(null).then(() => {
        if (value.routeEvent) {
          this.active =
            value.key === this.key || value.key.startsWith(this.key + '-')
              ? true
              : false;
        } else {
          if (value.key !== this.key && !value.key.startsWith(this.key + '-')) {
            this.active = false;
          }
        }
      });
    });

    this.menuResetSubscription = this.resetSource$.subscribe(() => {
      this.active = false;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((params) => {
        if (this.item.routerLink) {
          this.updateActiveStateFromRoute();
        }
      });
  }

  get submenuAnimation() {
    return this.root ? 'expanded' : this.active ? 'expanded' : 'collapsed';
  }

  @HostBinding('class.active-menuitem')
  get activeClass() {
    return this.active && !this.root;
  }

  ngOnInit() {
    this.key = this.parentKey
      ? this.parentKey + '-' + this.index
      : String(this.index);

    if (this.item.routerLink) {
      this.updateActiveStateFromRoute();
    }
  }

  updateActiveStateFromRoute() {
    let activeRoute = this.router.isActive(this.item.routerLink[0], {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored',
    });

    if (activeRoute) {
      this.onMenuStateChange({ key: this.key, routeEvent: true });
    }
  }

  itemClick(event: Event) {
    // avoid processing disabled items
    if (this.item.disabled) {
      event.preventDefault();
      return;
    }

    // execute command
    if (this.item.command) {
      this.item.command({ originalEvent: event, item: this.item });
    }

    // toggle active state
    if (this.item.items) {
      this.active = !this.active;
    }

    this.onMenuStateChange({ key: this.key });
  }

  ngOnDestroy() {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe();
    }

    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe();
    }
  }

  onMenuStateChange(event: any) {
    this.menuSource.next(event);
  }
}
