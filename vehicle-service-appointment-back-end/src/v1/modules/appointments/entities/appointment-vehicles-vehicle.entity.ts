import { Table } from '@v1/modules/appointments/enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schema } from '@v1/shared/enum';
import { Appointment } from '@v1/modules/appointments/entities/appointment.entity';
import { Vehicle } from '@v1/modules/vehicles/entities';
import { Factory } from 'nestjs-seeder';

@Entity(Table.appointment_vehicles_vehicle, {
  name: Table.appointment_vehicles_vehicle,
  schema: Schema.public,
  comment: 'Solo detalla que vehículos están en una cita',
})
export class AppointmentVehiclesVehicleEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    comment: 'updated_at',
  })
  updated_at?: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
    comment: 'deleted_at',
  })
  deleted_at?: Date;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    comment: 'created_at',
  })
  created_at?: Date;

  @Factory((faker) =>
    faker.helpers
      .arrayElements(['BAJO', 'MEDIO', 'ALTO', 'PENDIENTE'])
      .find((e) => e),
  )
  @Column('varchar', {
    name: 'damage_percentage',
    length: 100,
  })
  damage_percentage: string;

  @Factory((faker) =>
    faker.helpers
      .arrayElements(['MANTENIMIENTO', 'REPARAR', 'INSPECCIÓN'])
      .find((e) => e),
  )
  @Column('varchar', {
    name: 'type_service',
    length: 100,
  })
  type_service: string;

  @Factory((faker) =>
    faker.helpers
      .arrayElements(['EN ESPERA', 'EN REPARACIÓN', 'REPARADO', 'DAÑADO'])
      .find((e) => e),
  )
  @Column('varchar', {
    name: 'status_service',
    length: 100,
  })
  status_service: string;

  @ManyToOne(() => Appointment, (e) => e.appointmentVehicle, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({
    name: 'appointment_id',
  })
  appointment: Appointment;

  @ManyToOne(() => Vehicle, (v) => v.appointmentVehicle, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({
    name: 'vehicle_id',
  })
  vehicle: Vehicle;
}
