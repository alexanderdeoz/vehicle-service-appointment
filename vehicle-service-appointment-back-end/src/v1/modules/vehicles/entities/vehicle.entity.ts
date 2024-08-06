import { Table } from '@v1/modules/vehicles/enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schema } from '@v1/shared/enum';
import { Factory } from 'nestjs-seeder';
import { PartialType } from '@nestjs/swagger';
import { AppointmentVehiclesVehicleEntity } from '@v1/modules/appointments/entities';
import { VehicleProductsProductEntity } from '@v1/modules/vehicles/entities/vehicle-products-product.entity';
import { Model } from '@v1/modules/models/entities';
import { Brand } from '@v1/modules/brands/entities';
import { Fuel } from '@v1/modules/fuels/entities';

@Entity(Table.vehicle, {
  name: Table.vehicle,
  schema: Schema.public,
})
export class Vehicle {
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

  @Factory((faker) => faker.vehicle.vin())
  @Column('varchar', {
    name: 'plate',
    length: 255,
  })
  plate?: string;

  @Factory((faker) => faker.commerce.price())
  @Column('decimal', {
    name: 'mileage',
  })
  mileage?: number;

  @Factory((faker) =>
    faker.helpers
      .arrayElements(['EN DESUSO', 'PARA USO', 'INACTIVO'])
      .find((e) => e),
  )
  @Column('varchar', {
    name: 'status',
    length: 255,
  })
  status?: string;

  @Factory((faker) => faker.location.county())
  @Column('varchar', {
    name: 'made_in',
    length: 255,
  })
  made_in?: string;

  @Factory((faker) => faker.date.recent())
  @Column('timestamp', {
    name: 'warranty_up_to',
  })
  warranty_up_to?: Date;

  @Factory((faker) => faker.date.recent())
  @Column('timestamp', {
    name: 'next_review_at',
  })
  next_review_at?: Date;

  @ManyToOne(() => Model, (e) => e.vehicles, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({
    name: 'model_id',
  })
  model?: string;

  @ManyToOne(() => Brand, (e) => e.vehicles, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({
    name: 'brand_id',
  })
  brand?: string;

  @ManyToOne(() => Fuel, (e) => e.vehicles, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({
    name: 'fuel_id',
  })
  fuel?: string;

  @OneToMany(() => AppointmentVehiclesVehicleEntity, (r) => r.vehicle, {
    cascade: true,
  })
  appointmentVehicle?: AppointmentVehiclesVehicleEntity[];

  @OneToMany(() => VehicleProductsProductEntity, (p) => p.vehicle, {
    cascade: true,
  })
  vehicleProductsProduct?: VehicleProductsProductEntity[];

  constructor(opts?: PartialType<Vehicle>) {
    this.plate = opts?.plate;
    this.mileage = parseFloat(opts?.mileage);
    this.status = opts?.status;
    this.made_in = opts?.made_in;
    this.warranty_up_to = opts?.warranty_up_to;
    this.next_review_at = opts?.next_review_at;
    this.model = opts?.model;
    this.brand = opts?.brand;
    this.fuel = opts?.fuel;
    this.appointmentVehicle = opts?.appointmentVehicle;
    this.vehicleProductsProduct = opts?.vehicleProductsProduct;
  }
}
