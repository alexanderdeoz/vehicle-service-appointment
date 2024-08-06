import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FuelStatus, Table } from '@v1/modules/fuels/enums';
import { Schema } from '@v1/shared/enum';
import { Factory } from 'nestjs-seeder';
import { Vehicle } from '@v1/modules/vehicles/entities';

@Entity({
  name: Table.name,
  schema: Schema.public,
})
export class Fuel {
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
      .arrayElements([FuelStatus.ACTIVE, FuelStatus.INACTIVE])
      .find((e) => e),
  )
  @Column('varchar', {
    name: 'status',
    length: 100,
  })
  status?: FuelStatus;

  @Column('varchar', {
    name: 'name',
    length: 100,
  })
  name?: string;

  @OneToMany(() => Vehicle, (r) => r.brand, {
    cascade: true,
  })
  vehicles?: Vehicle[];

  constructor(props?: Partial<Fuel>) {
    this.status = props?.status;
    this.name = props?.name;
  }
}
