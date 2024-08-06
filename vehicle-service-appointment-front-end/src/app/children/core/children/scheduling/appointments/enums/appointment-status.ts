export enum AppointmentStatus {
  ISSUED = 'EMITIDO',
  IN = 'EN PROGRESO',
  CANCELLED = 'CANCELADO',
  EXPIRED = 'VENCIDO',
  FINALIZED = 'FINALIZADO',
}

export const AppointmentStatusList: string[] = [
  AppointmentStatus.ISSUED,
  AppointmentStatus.IN,
  AppointmentStatus.CANCELLED,
  AppointmentStatus.EXPIRED,
  AppointmentStatus.FINALIZED,
];
