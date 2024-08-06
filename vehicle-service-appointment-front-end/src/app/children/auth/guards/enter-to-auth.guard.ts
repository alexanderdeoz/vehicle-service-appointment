import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {SessionService} from '@app/services';
import {CoreRoute} from '@app/shared/enum';

/**
 * Si en algún momento el usuario quiere entrar al módulo de auth,
 * se va a verificar que esté autenticado, para redireccionarlo al módulo de enterprise,
 * si no está autenticado lo redireccionará al módulo de auth, para que inicie sesión.
 *
 * @param _
 * @param __
 * @constructor
 */
export const EnterToAuthGuard: CanActivateFn = async (
  _,
  __,
): Promise<boolean> => {
  const authService = inject(SessionService);
  const appRouteService = inject(Router);
  if (authService.isAuth) {
    await appRouteService.navigate([CoreRoute.dashboard]);
  }
  return !authService.isAuth;
};
