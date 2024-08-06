export interface DataDashboard {
  user?: {
    usersCount?: number;
    usersNewCount?: number;
  };
  appointment?: {
    appointmentsCount?: number;
    appointmentsNewCount?: number;
  };
  product?: {
    productsCount?: number;
    productsNewCount?: number;
  };
  vehicle?: {
    vehiclesCount?: number;
    vehiclesNewCount?: number;
  };
}
