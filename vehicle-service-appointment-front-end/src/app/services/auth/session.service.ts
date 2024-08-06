import {Injectable} from '@angular/core';
import {ConfirmationServiceConfig} from '@app/shared/config';
import {ConfirmationService} from 'primeng/api';
import {Router} from '@angular/router';
import {ToastMessageService} from '@app/shared/services/toast-message.service';
import {AppRoute, AuthRoute} from '@app/shared/enum';
import {CookiesService} from '@app/services/storage';
import {EntityFromSystemType} from '@app/children/core/children/parameters/entities-from-system/enum';
import {PermissionType} from '@app/children/core/children/parameters/permissions/enum';
import {RoleType} from '@app/children/core/children/parameters/roles/enum';
import {IRolePermissionModel, IUserPermissionModel,} from '@app/children/auth/models/role';

/**  Este servicio sirve para ser un punto de entrada de datos de la sessión. */
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(
    private readonly router: Router,
    private readonly confirmationService: ConfirmationService,
    private readonly cookiesService: CookiesService,
    private readonly toastMessageService: ToastMessageService,
  ) {}

  public get isAuth(): boolean {
    return (
      Boolean(this.cookiesService.accessToken) &&
      Boolean(this.cookiesService.user)
    );
  }

  public hasPermission(opts?: {
    resource?: EntityFromSystemType;
    permission?: PermissionType;
  }): boolean {
    let rolePermissions: (IRolePermissionModel | IUserPermissionModel)[] = [];
    rolePermissions?.push(...(this.cookiesService.userPermissions ?? []));
    this.cookiesService.roles.map((e) =>
      rolePermissions?.push(...(e.role?.role_permissions ?? [])),
    );

    return rolePermissions?.some(
      (r) =>
        r.entity_from_system?.name == opts?.resource &&
        r.permission?.name == opts?.permission,
    );
  }

  public hasRole(roles: RoleType[]): boolean {
    return roles.some((r) =>
      this.cookiesService.roles.some((d) => d.role?.name == r),
    );
  }

  /**
   * Lanza pregunta para qué el usuario defina si cerrar sessión o no.
   */
  public onQuestionLogout(): void {
    this.confirmationService.confirm({
      ...ConfirmationServiceConfig,
      header: 'Confirmación',
      message: `¿Cerrar sesión?`,
      // acceptIcon: 'pi pi-check mr-2',
      // rejectIcon: 'pi pi-times mr-2',
      // rejectButtonStyleClass: 'p-button-sm',
      // acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: async () => this.onAcceptLogout(),
      reject: () => null,
    });
  }

  /**
   * Acciones a ejecutar cuando se acepte eliminar la sessión.
   */
  public async onAcceptLogout(): Promise<void> {
    sessionStorage.clear();
    this.cookiesService.deleteAll();
    await this.router.navigate(['/', AppRoute.auth, AuthRoute.login]);
    this.toastMessageService.success({
      summary: 'Sessión borrada correctamente',
      detail: 'vuelva pronto',
    });
  }
}
