const date = new Date();
date.setHours(date.getHours() + 24);
export const environment = {
  production: true,
  API_DOMAIN: 'api/v1/',
  COOKIE__USER: 'vehicle-service-appointment-cookie--USER',
  COOKIE__ACCESS_TOKEN: 'vehicle-service-appointment-cookie--ACCESS-TOKEN',
  COOKIE__EXPIRES: date,
};
