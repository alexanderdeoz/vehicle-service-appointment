import {
  JoinColumn,
  ManyToOne,
  Relation,
  ViewColumn,
  ViewEntity,
} from 'typeorm';
import { Table } from '@v1/modules/appointments/enum';
import { Schema } from '@v1/shared/enum';
import { User } from '@v1/modules/users/entities';

@ViewEntity({
  name: Table.mechanic_with_fewer_appointments,
  schema: Schema.public,
  expression:
    'select u.id as mechanic_id, count(a.created_at) as amount_appointment from public.user u inner join public.appointment a on u.id = a.mechanic_id group by u.id order by amount_appointment',
})
export class MechanicWithFewerAppointmentsEntity {
  @ManyToOne(() => User, {
    nullable: true,
  })
  @JoinColumn({
    name: 'mechanic_id',
  })
  mechanic?: Relation<User>;

  @ViewColumn({
    name: 'amount_appointment',
  })
  amount_appointment?: number;
}
