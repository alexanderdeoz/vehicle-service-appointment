const date = new Date();
date.setHours(date.getHours() + 24);
export const environment = {
  production: false,
  API_DOMAIN: 'http://localhost:5000/api/v1/',
  COOKIE__USER: 'dev-vehicle-service-appointment-cookie--USER',
  COOKIE__ACCESS_TOKEN: 'dev-vehicle-service-appointment-cookie--ACCESS_TOKEN',
  COOKIE__EXPIRES: date,
};
