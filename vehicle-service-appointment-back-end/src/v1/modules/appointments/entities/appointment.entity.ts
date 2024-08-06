import { AppointmentStatus, Table } from '@v1/modules/appointments/enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Schema } from '@v1/shared/enum';
import { Factory } from 'nestjs-seeder';
import { AppointmentVehiclesVehicleEntity } from '@v1/modules/appointments/entities/appointment-vehicles-vehicle.entity';
import { CreateAppointmentDto } from '@v1/modules/appointments/dto';
import { VehicleProductsProductEntity } from '@v1/modules/vehicles/entities';
import { User } from '@v1/modules/users/entities';

@Entity(Table.appointment, {
  name: Table.appointment,
  schema: Schema.public,
})
export class Appointment {
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
      .arrayElements([
        AppointmentStatus.ISSUED,
        AppointmentStatus.IN,
        AppointmentStatus.CANCELLED,
        AppointmentStatus.EXPIRED,
        AppointmentStatus.FINALIZED,
      ])
      .find((e) => e),
  )
  @Column('varchar', {
    name: 'status',
    length: 100,
  })
  status?: AppointmentStatus;

  @Factory((faker) => faker.date.recent())
  @Column('timestamp', {
    name: 'scheduled_at',
  })
  scheduled_at?: Date;

  @Factory((faker) => faker.lorem.lines(2))
  @Column('text', {
    name: 'description',
  })
  description?: string;

  @Factory((faker) => faker.date.recent())
  @Column('timestamp', {
    name: 'valid_until_at',
  })
  valid_until_at?: Date;

  @Factory((faker) => faker.lorem.lines(2))
  @Column('text', {
    name: 'reason',
  })
  reason?: string;

  @ManyToOne(() => User, (e) => e.appointments)
  @JoinColumn({
    name: 'user_id',
  })
  user?: Relation<User>;

  @ManyToOne(() => User, {
    nullable: true,
  })
  @JoinColumn({
    name: 'mechanic_id',
  })
  mechanic?: Relation<User>;

  @OneToMany(() => AppointmentVehiclesVehicleEntity, (r) => r.appointment, {
    cascade: true,
  })
  appointmentVehicle?: AppointmentVehiclesVehicleEntity[];

  @OneToMany(() => VehicleProductsProductEntity, (r) => r.appointment, {
    cascade: true,
  })
  appointmentProducts?: VehicleProductsProductEntity[];

  constructor(props?: Partial<CreateAppointmentDto>) {
    this.status = props?.status;
    this.scheduled_at = new Date(props?.scheduled_at);
    this.description = props?.description;
    this.valid_until_at = new Date(props?.valid_until_at);
    this.reason = props?.reason;
    this.appointmentVehicle = props?.appointmentVehicle;
    this.appointmentProducts = props?.appointmentProducts;
  }
}
