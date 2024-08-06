export enum ServiceStatus {
  ON_HOLD = 'EN ESPERA',
  IN_REPAIR = 'EN REPARACIÓN',
  REPAIRED = 'REPARADO',
  DAMAGED = 'DAÑADO',
}

export const StatusServiceList: string[] = [
  ServiceStatus.ON_HOLD,
  ServiceStatus.IN_REPAIR,
  ServiceStatus.REPAIRED,
  ServiceStatus.DAMAGED,
];
