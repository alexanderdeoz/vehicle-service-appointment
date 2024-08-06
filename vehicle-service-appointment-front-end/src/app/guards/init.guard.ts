import {CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {SessionService} from '@app/services';
import {AppRoute, AuthRoute, CoreRoute} from '@app/shared/enum';

/** Cunado el usuario entre al sistema sin ninguna uri, vamos a redireccionarlo según el estado de la autenticación.
 *
 * @param _
 * @param state
 * @constructor
 */
export const InitGuard: CanActivateFn = async (
  _,
  state: RouterStateSnapshot,
): Promise<boolean> => {
  const router = inject(Router);
  const authService = inject(SessionService);
  if (state.url == '/') {
    if (authService.isAuth) {
      await router.navigate(['/', AppRoute.core, CoreRoute.dashboard]);
    } else {
      await router.navigate(['/', AppRoute.auth, AuthRoute.login]);
    }
  }
  return true;
};
