import { Schema } from '@v1/shared/enum';
import { Table } from '../enum';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityFromSystem } from '@v1/modules/entity-from-system/entities/entity-from-system.entity';
import { Permission } from '@v1/modules/permissions/entities';

@Entity(Table.entity_from_system_permission, {
  name: Table.entity_from_system_permission,
  schema: Schema.public,
})
export class EntityFromSystemPermissionEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @ManyToOne(
    () => EntityFromSystem,
    (photo) => photo.entityFromSystemPermission,
  )
  @JoinColumn({
    name: 'entity_from_system_id',
  })
  entityFromSystem?: EntityFromSystem;

  @ManyToOne(() => Permission, (photo) => photo.entityFromSystemPermission)
  @JoinColumn({
    name: 'permission_id',
  })
  permission?: Permission;

  constructor(props?: Partial<EntityFromSystemPermissionEntity>) {
    this.entityFromSystem = props?.entityFromSystem;
    this.permission = props?.permission;
  }
}
