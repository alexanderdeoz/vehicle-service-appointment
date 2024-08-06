import { Table } from '@v1/modules/users/enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Schema } from '@v1/shared/enum';
import { Factory } from 'nestjs-seeder';
import { Status } from '@v1/modules/users/enum/status';
import { UserRole } from '@v1/modules/users/entities/user-role.entity';
import { UserPermissionEntity } from '@v1/modules/users/entities/user-permission.entity';
import { Appointment } from '@v1/modules/appointments/entities';

@Entity(Table.user, {
  name: Table.user,
  schema: Schema.public,
})
export class User {
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

  @Factory((faker) => faker.internet.email())
  @Column('varchar', {
    name: 'email',
    length: 100,
    comment: 'Correo',
  })
  email?: string;

  @Factory(() => 'prueba')
  @Column('varchar', {
    name: 'password',
    length: 100,
  })
  password?: string;

  @Factory((faker) =>
    faker.helpers
      .arrayElements([Status.ACTIVE, Status.INACTIVE, Status.SUSPENDED])
      .find((e) => e),
  )
  @Column('varchar', {
    name: 'status',
    length: 100,
    comment: 'Estado: ACTIVO, INACTIVO, SUSPENDIDO',
  })
  status?: Status;

  @Factory((faker) => faker.person.fullName())
  @Column('varchar', {
    name: 'name',
    length: 100,
  })
  name?: string;

  @Factory((faker) => faker.date.recent())
  @Column('varchar', {
    name: 'birth_date',
    length: 100,
  })
  birth_date?: Date;

  @Factory((faker) => faker.location.direction())
  @Column('varchar', {
    name: 'address',
    length: 100,
  })
  address?: string;

  @Factory((faker) => faker.company.buzzNoun())
  @Column('varchar', {
    name: 'identification',
    length: 100,
  })
  identification?: string;

  @Factory((faker) => faker.phone.imei())
  @Column('varchar', {
    name: 'phone',
    length: 100,
  })
  phone?: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user, {
    cascade: true,
  })
  roles?: UserRole[];

  @OneToMany(() => Appointment, (userRole) => userRole.user, {
    cascade: true,
  })
  appointments?: Appointment[];

  @OneToMany(
    () => UserPermissionEntity,
    (userPermission) => userPermission.user,
    {
      cascade: true,
    },
  )
  user_permissions: Relation<UserPermissionEntity>[];
}
