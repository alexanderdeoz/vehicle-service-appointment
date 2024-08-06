import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot,} from '@angular/router';
import {inject} from '@angular/core';
import {MessageModel} from '@app/models/app';
import {AppRoute, CommonRoute, SeverityMessageServiceEnum,} from '@app/shared/enum';
import {IRouteStateModel} from '@app/shared/models';

/**
 * Cuando el usuario cargue el sistema tendrá una ruta /.
 * Entonces este CanActivateFn nos proporciona la lógica para redireccionar al usuario a una vista en específico, correspondiente al estado de la sessión.
 */
export const RedirectGuard: CanActivateFn = (
  _: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  router
    .navigate(['/', AppRoute.common, CommonRoute.notFound], {
      state: {
        data: {
          severity: SeverityMessageServiceEnum.warning,
          summary: 'Recurso no encontrado ' + state.url,
          detail: 'Esta dirección url no se pudo encontrar',
        },
      } as IRouteStateModel<MessageModel>,
    })
    .then((_) => null);
  return false;
};
