import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {SessionService} from '@app/services';
import {AppRoute, AuthRoute} from '@app/shared/enum';

/**
 * Cunado el usuario quiera entrar a este módulo, lo primero que vamos a hacer es verificar que esté autenticado.
 * Si no lo está, lo redireccionamos al inicio de sesión, y si está correctamente autenticado lo dejamos entrar a la ruta correspondiente.
 *
 * @param _
 * @param __
 * @constructor
 */
export const EnterToCoreGuard: CanActivateFn = async (
  _,
  __,
): Promise<boolean> => {
  const router = inject(Router);
  const authService = inject(SessionService);
  if (!authService.isAuth) {
    await router.navigate(['/', AppRoute.auth, AuthRoute.login]);
  }
  return authService.isAuth;
};
