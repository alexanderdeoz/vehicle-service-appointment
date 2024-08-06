import { Table } from '@v1/modules/vehicles/enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Schema } from '@v1/shared/enum';
import { Vehicle } from '@v1/modules/vehicles/entities/vehicle.entity';
import { Product } from '@v1/modules/products/entities';
import { Appointment } from '@v1/modules/appointments/entities';
import { VehicleProductsProductDto } from '@v1/modules/vehicles/dto';
import { Factory } from 'nestjs-seeder';

@Entity(Table.vehicle_products_product, {
  name: Table.vehicle_products_product,
  schema: Schema.public,
  comment: 'Detalla que productos tuvo un vehículo en una cita',
})
export class VehicleProductsProductEntity {
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

  @Factory(() => false)
  @Column('boolean', {
    name: 'repair',
    comment:
      'indica si este producto/servicio se debe reparar, child_id será el nuevo producto en el vehículo',
  })
  repair?: boolean;

  @ManyToOne(() => Appointment, (e) => e.appointmentProducts, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({
    name: 'appointment_id',
  })
  appointment: Appointment;

  @ManyToOne(() => Vehicle, (v) => v.vehicleProductsProduct, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({
    name: 'vehicle_id',
  })
  vehicle?: Relation<Vehicle>;

  @ManyToOne(() => Product, (v) => v.vehicleProductsProduct, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({
    name: 'product_id',
  })
  product?: Product;

  @ManyToOne(() => VehicleProductsProductEntity, {
    cascade: true,
  })
  @JoinColumn({
    name: 'child_id',
  })
  @Column('integer', {
    name: 'child_id',
    comment:
      'referencia a un producto padre, ese padre será reparado con su hijo. ',
    primary: false,
    unique: false,
    nullable: true,
  })
  child?: VehicleProductsProductEntity;

  constructor(
    opts: Partial<VehicleProductsProductEntity | VehicleProductsProductDto>,
  ) {
    this.repair = opts?.repair;
    this.vehicle = opts?.vehicle;
    this.product = opts?.product;
    this.child = opts?.child;
  }
}
