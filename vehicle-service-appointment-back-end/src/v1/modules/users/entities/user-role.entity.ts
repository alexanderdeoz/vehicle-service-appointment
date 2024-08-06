import { Table } from '@v1/modules/users/enum';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Schema } from '@v1/shared/enum';
import { User } from '@v1/modules/users/entities/user.entity';
import { Role } from '@v1/modules/roles/entities';

@Entity(Table.user_role, {
  name: Table.user_role,
  schema: Schema.public,
  comment: 'Los roles que va a tener cada usuario.',
})
export class UserRole {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @ManyToOne(() => User, (e) => e.roles, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user?: Relation<User>;

  @ManyToOne(() => Role, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({
    name: 'rol_id',
  })
  role?: Role;
}
