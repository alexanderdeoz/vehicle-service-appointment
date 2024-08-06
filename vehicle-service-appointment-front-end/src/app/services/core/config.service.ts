import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {IConfigModel} from '@app/services/core/core';

/**
 * Valores de la configuración.
 */
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public get config(): IConfigModel {
    return {
      production: environment.production,
      API_DOMAIN: environment.API_DOMAIN,
      COOKIE__USER: environment.COOKIE__USER,
      COOKIE__ACCESS_TOKEN: environment.COOKIE__ACCESS_TOKEN,
      COOKIE__EXPIRES: environment.COOKIE__EXPIRES,
    };
  }
}
