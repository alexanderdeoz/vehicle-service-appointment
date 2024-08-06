import { DataSourceToken } from '@v1/shared/enum';
import { Appointment } from '@v1/modules/appointments/entities/appointment.entity';
import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { AppointmentVehiclesVehicleEntity } from '@v1/modules/appointments/entities/appointment-vehicles-vehicle.entity';
import { MechanicWithFewerAppointmentsEntity } from '@v1/modules/appointments/entities';

export const Repositories: Provider[] = [
  {
    provide: AppointmentVehiclesVehicleEntity,
    useFactory: (ts: DataSource) =>
      ts.getRepository(AppointmentVehiclesVehicleEntity),
    inject: [DataSourceToken.B1],
  },
  {
    provide: Appointment,
    useFactory: (ts: DataSource) => ts.getRepository(Appointment),
    inject: [DataSourceToken.B1],
  },
  {
    provide: MechanicWithFewerAppointmentsEntity,
    useFactory: (ts: DataSource) =>
      ts.getRepository(MechanicWithFewerAppointmentsEntity),
    inject: [DataSourceToken.B1],
  },
];
