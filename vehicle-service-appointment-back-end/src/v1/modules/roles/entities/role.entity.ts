import { RoleStatus, RoleType, Table } from '@v1/modules/roles/enum';
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
import { RolePermission } from '@v1/modules/users/entities';

@Entity(Table.role, {
  name: Table.role,
  schema: Schema.public,
})
export class Role {
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

  @Column('varchar', {
    name: 'status',
  })
  status?: RoleStatus;

  @Column('varchar', {
    name: 'name',
    length: 100,
  })
  name?: RoleType;

  @OneToMany(() => RolePermission, (photo) => photo.role, {
    cascade: true,
  })
  role_permissions: Relation<RolePermission>[];

  constructor(props?: Partial<Role>) {
    this.status = props?.status;
    this.name = props?.name;
    this.role_permissions = props?.role_permissions;
  }
}
