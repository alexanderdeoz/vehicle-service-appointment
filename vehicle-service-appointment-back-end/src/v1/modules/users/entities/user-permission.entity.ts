import { Table } from '@v1/modules/users/enum';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Schema } from '@v1/shared/enum';
import { Permission } from '@v1/modules/permissions/entities';
import { EntityFromSystem } from '@v1/modules/entity-from-system/entities';
import { User } from '@v1/modules/users/entities/user.entity';

@Entity(Table.user_permission, {
  name: Table.user_permission,
  schema: Schema.public,
})
export class UserPermissionEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @ManyToOne(() => User, (e) => e.user_permissions, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user?: Relation<User>;

  @ManyToOne(() => Permission, (e) => e.user_permissions)
  @JoinColumn({
    name: 'permission_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'permission_id',
  })
  permission?: Permission;

  @ManyToOne(() => EntityFromSystem, (e) => e.user_permissions)
  @JoinColumn({
    name: 'entity_from_system_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'entity_from_system_id',
  })
  entity_from_system?: EntityFromSystem;
}
