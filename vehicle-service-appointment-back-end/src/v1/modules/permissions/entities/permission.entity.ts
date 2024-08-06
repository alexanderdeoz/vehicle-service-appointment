import {
  PermissionStatus,
  PermissionType,
  Table,
} from '@v1/modules/permissions/enum';
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
import { UserPermissionEntity } from '@v1/modules/users/entities';
import { EntityFromSystemPermissionEntity } from '@v1/modules/entity-from-system/entities/entity-from-system-permission.entity';

@Entity(Table.permission, {
  name: Table.permission,
  schema: Schema.public,
})
export class Permission {
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
  status?: PermissionStatus;

  @Column('varchar', {
    name: 'name',
    length: 100,
    unique: true,
  })
  name?: PermissionType;

  @OneToMany(() => UserPermissionEntity, (photo) => photo.permission)
  user_permissions: Relation<UserPermissionEntity>[];

  @OneToMany(
    () => EntityFromSystemPermissionEntity,
    (userPermission) => userPermission.entityFromSystem,
    {
      cascade: true,
    },
  )
  entityFromSystemPermission: Relation<EntityFromSystemPermissionEntity>[];

  constructor(props?: Partial<Permission>) {
    this.status = props?.status;
    this.name = props?.name;
  }
}
