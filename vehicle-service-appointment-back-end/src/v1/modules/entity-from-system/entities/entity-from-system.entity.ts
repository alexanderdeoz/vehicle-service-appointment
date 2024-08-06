import { Schema } from '@v1/shared/enum';
import { EntityFromSystemStatus, EntityType, Table } from '../enum';
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
import { UserPermissionEntity } from '@v1/modules/users/entities';
import { EntityFromSystemPermissionEntity } from '@v1/modules/entity-from-system/entities/entity-from-system-permission.entity';

@Entity(Table.entity_from_system, {
  name: Table.entity_from_system,
  schema: Schema.public,
})
export class EntityFromSystem {
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
  status?: EntityFromSystemStatus;

  @Column('varchar', {
    name: 'name',
    length: 100,
    unique: true,
  })
  name?: EntityType;

  @OneToMany(() => UserPermissionEntity, (photo) => photo.entity_from_system)
  user_permissions?: Relation<UserPermissionEntity>[];

  @ManyToOne(() => EntityFromSystem, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  @JoinColumn({
    name: 'father_id',
  })
  @Column('int', {
    name: 'father_id',
    primary: false,
    unique: false,
    nullable: true,
  })
  father?: EntityFromSystem;

  children?: EntityFromSystem[];

  @Column('varchar', {
    name: 'icon',
    length: 100,
    nullable: true,
  })
  icon?: string;

  @Column('varchar', {
    name: 'routerLink',
    length: 100,
    nullable: true,
  })
  routerLink?: string;

  @OneToMany(
    () => EntityFromSystemPermissionEntity,
    (userPermission) => userPermission.entityFromSystem,
    {
      cascade: true,
    },
  )
  entityFromSystemPermission: Relation<EntityFromSystemPermissionEntity>[];

  constructor(props?: Partial<EntityFromSystem>) {
    this.status = props?.status;
    this.name = props?.name;
    this.father = props?.father;
    this.icon = props?.icon;
    this.routerLink = props?.routerLink;
    this.entityFromSystemPermission = props?.entityFromSystemPermission;
  }
}
