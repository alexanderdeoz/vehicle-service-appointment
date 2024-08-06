import { CookieOptions } from 'ngx-cookie';
import { environment } from '@env/environment';

export const CookieConfig: CookieOptions = {
  path: '/',
  secure: false,
  sameSite: 'lax',
  expires: environment.COOKIE__EXPIRES as any,
};
