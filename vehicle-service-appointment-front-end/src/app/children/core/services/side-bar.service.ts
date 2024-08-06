import { Injectable } from '@angular/core';
import { SessionService } from '@app/services';
import { BehaviorSubject } from 'rxjs';
import { EntitiesFromSystemHttpService } from '@app/children/core/children/parameters/entities-from-system/services';
import { IEntityFromSystemModel } from '@app/children/core/children/parameters/entities-from-system/models/i-entity-from-system.model';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  public readonly options$ = new BehaviorSubject<MenuItem[]>([]);
  // public readonly options$ = new BehaviorSubject<SideBarItem[]>([]);
  private _options: IEntityFromSystemModel[] = [];
  // private readonly _options: SideBarItem[] = [
  //   {
  //     label: 'Inicio',
  //     items: [
  //       {
  //         label: 'Tablero',
  //         icon: 'pi pi-home',
  //         routerLink: ['/', AppRoute.core, CoreRoute.dashboard],
  //       },
  //     ],
  //   },
  //   {
  //     label: 'Agendamiento',
  //     items: [
  //       {
  //         label: 'Citas',
  //         icon: 'pi pi-clipboard',
  //         rolePermissions: [
  //           {
  //             role: {
  //               name: RoleType.SUPER_ADMINISTRATOR,
  //             },
  //           },
  //           {
  //             role: {
  //               name: RoleType.ADMINISTRATOR,
  //             },
  //           },
  //           {
  //             role: {
  //               name: RoleType.MECHANIC,
  //             },
  //           },
  //           {
  //             role: {
  //               name: RoleType.CUSTOMER,
  //             },
  //           },
  //         ],
  //         routerLink: [
  //           '/',
  //           AppRoute.core,
  //           CoreRoute.scheduling,
  //           SchedulingRoute.appointments,
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     label: 'Parámetros',
  //     items: [
  //       {
  //         label: 'Usuarios',
  //         icon: 'pi pi-users',
  //         rolePermissions: [
  //           {
  //             role: {
  //               name: RoleType.SUPER_ADMINISTRATOR,
  //             },
  //           },
  //           {
  //             role: {
  //               name: RoleType.ADMINISTRATOR,
  //             },
  //           },
  //         ],
  //         routerLink: [
  //           '/',
  //           AppRoute.core,
  //           CoreRoute.parameters,
  //           ParameterRoute.users,
  //         ],
  //       },
  //       {
  //         label: 'Roles',
  //         icon: 'pi pi-key',
  //         rolePermissions: [
  //           {
  //             role: {
  //               name: RoleType.SUPER_ADMINISTRATOR,
  //             },
  //           },
  //           {
  //             role: {
  //               name: RoleType.ADMINISTRATOR,
  //             },
  //           },
  //         ],
  //         routerLink: [
  //           '/',
  //           AppRoute.core,
  //           CoreRoute.parameters,
  //           ParameterRoute.roles,
  //         ],
  //       },
  //       {
  //         label: 'Permisos',
  //         icon: 'pi pi-key',
  //         rolePermissions: [
  //           {
  //             role: {
  //               name: RoleType.SUPER_ADMINISTRATOR,
  //             },
  //           },
  //           {
  //             role: {
  //               name: RoleType.ADMINISTRATOR,
  //             },
  //           },
  //         ],
  //         routerLink: [
  //           '/',
  //           AppRoute.core,
  //           CoreRoute.parameters,
  //           ParameterRoute.permissions,
  //         ],
  //       },
  //       {
  //         label: 'Recursos',
  //         icon: 'pi pi-key',
  //         rolePermissions: [
  //           {
  //             role: {
  //               name: RoleType.SUPER_ADMINISTRATOR,
  //             },
  //           },
  //           {
  //             role: {
  //               name: RoleType.ADMINISTRATOR,
  //             },
  //           },
  //         ],
  //         routerLink: [
  //           '/',
  //           AppRoute.core,
  //           CoreRoute.parameters,
  //           ParameterRoute.entitiesFromSystem,
  //         ],
  //       },
  //       {
  //         label: 'Administrar permisos',
  //         icon: 'pi pi-key',
  //         rolePermissions: [
  //           {
  //             role: {
  //               name: RoleType.SUPER_ADMINISTRATOR,
  //             },
  //           },
  //           {
  //             role: {
  //               name: RoleType.ADMINISTRATOR,
  //             },
  //           },
  //         ],
  //         routerLink: [
  //           '/',
  //           AppRoute.core,
  //           CoreRoute.parameters,
  //           ParameterRoute.managePermissions,
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     label: 'Taller',
  //     icon: 'pi pi-car',
  //     rolePermissions: [
  //       {
  //         role: {
  //           name: RoleType.SUPER_ADMINISTRATOR,
  //         },
  //       },
  //       {
  //         role: {
  //           name: RoleType.ADMINISTRATOR,
  //         },
  //       },
  //     ],
  //     items: [
  //       {
  //         label: 'Vehículos',
  //         icon: 'pi pi-car',
  //         rolePermissions: [
  //           {
  //             role: {
  //               name: RoleType.SUPER_ADMINISTRATOR,
  //             },
  //           },
  //           {
  //             role: {
  //               name: RoleType.ADMINISTRATOR,
  //             },
  //           },
  //         ],
  //         routerLink: [
  //           '/',
  //           AppRoute.core,
  //           CoreRoute.mechanicalWorkshop,
  //           MechanicalWorkshopRoute.vehicles,
  //         ],
  //       },
  //       {
  //         label: 'Productos',
  //         icon: 'pi pi-desktop',
  //         rolePermissions: [
  //           {
  //             role: {
  //               name: RoleType.SUPER_ADMINISTRATOR,
  //             },
  //           },
  //           {
  //             role: {
  //               name: RoleType.ADMINISTRATOR,
  //             },
  //           },
  //           {
  //             role: {
  //               name: RoleType.MECHANIC,
  //             },
  //           },
  //         ],
  //         routerLink: [
  //           '/',
  //           AppRoute.core,
  //           CoreRoute.mechanicalWorkshop,
  //           MechanicalWorkshopRoute.products,
  //         ],
  //       },
  //       {
  //         label: 'Modelos',
  //         icon: 'pi pi-list',
  //         rolePermissions: [
  //           {
  //             role: {
  //               name: RoleType.SUPER_ADMINISTRATOR,
  //             },
  //           },
  //           {
  //             role: {
  //               name: RoleType.ADMINISTRATOR,
  //             },
  //           },
  //         ],
  //         routerLink: [
  //           '/',
  //           AppRoute.core,
  //           CoreRoute.mechanicalWorkshop,
  //           MechanicalWorkshopRoute.models,
  //         ],
  //       },
  //       {
  //         label: 'Marcas',
  //         icon: 'pi pi-list',
  //         rolePermissions: [
  //           {
  //             role: {
  //               name: RoleType.SUPER_ADMINISTRATOR,
  //             },
  //           },
  //           {
  //             role: {
  //               name: RoleType.ADMINISTRATOR,
  //             },
  //           },
  //         ],
  //         routerLink: [
  //           '/',
  //           AppRoute.core,
  //           CoreRoute.mechanicalWorkshop,
  //           MechanicalWorkshopRoute.brands,
  //         ],
  //       },
  //       {
  //         label: 'Combustibles',
  //         icon: 'pi pi-list',
  //         rolePermissions: [
  //           {
  //             role: {
  //               name: RoleType.SUPER_ADMINISTRATOR,
  //             },
  //           },
  //           {
  //             role: {
  //               name: RoleType.ADMINISTRATOR,
  //             },
  //           },
  //         ],
  //         routerLink: [
  //           '/',
  //           AppRoute.core,
  //           CoreRoute.mechanicalWorkshop,
  //           MechanicalWorkshopRoute.fuels,
  //         ],
  //       },
  //     ],
  //   },
  // ];

  constructor(
    private readonly sessionService: SessionService,
    private readonly entitiesFromSystemHttpService: EntitiesFromSystemHttpService,
  ) {
    this.entitiesFromSystemHttpService.findAllMenuOption().subscribe({
      next: (res) => {
        this._options = res.body?.data ?? [];
        this.validateRoutes();
      },
    });
  }

  validateRoutes(): void {
    let routes = this.validateAllow(JSON.parse(JSON.stringify(this._options)));
    this.options$.next(
      routes.map<MenuItem>((e) => ({
        label: e.name,
        icon: e.icon,
        routerLink: e.routerLink,
        items: e?.children?.map<MenuItem>((e) => ({
          label: e.name,
          icon: e.icon,
          routerLink: e.routerLink,
        })),
      })),
    );
  }

  private validateAllow(
    items: IEntityFromSystemModel[],
  ): IEntityFromSystemModel[] {
    for (const item of items) {
      if (item.children) {
        item.children = this.validateAllow(item.children);
      }
      items = items.filter((i) => {
        let valid = false;
        if (i.entityFromSystemPermission) {
          for (let rolePermission of i.entityFromSystemPermission) {
            const opt = {
              resource: rolePermission.entityFromSystem?.name,
              permission: rolePermission.permission?.name,
            };
            if (this.sessionService.hasPermission(opt)) {
              valid = true;
            }
          }
        }
        return valid;
      });
    }
    return items;
  }
}
