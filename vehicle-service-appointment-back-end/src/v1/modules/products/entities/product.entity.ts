import { Table } from '@v1/modules/products/enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schema } from '@v1/shared/enum';
import { Factory } from 'nestjs-seeder';
import { VehicleProductsProductEntity } from '@v1/modules/vehicles/entities/vehicle-products-product.entity';
import { PartialType } from '@nestjs/swagger';

@Entity(Table.product, {
  name: Table.product,
  schema: Schema.public,
})
export class Product {
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

  @Factory((faker) => faker.finance.amount({ min: 0, max: 100 }))
  @Column('varchar', {
    name: 'damage_frequency',
    length: 100,
    nullable: true,
  })
  damage_frequency?: string;

  @Factory((faker) => faker.commerce.product())
  @Column('varchar', {
    name: 'name',
    length: 255,
  })
  name?: string;

  @Factory((faker) => faker.commerce.price())
  @Column('decimal', {
    name: 'sale_price',
  })
  sale_price?: number;

  @Factory((faker) => faker.internet.url())
  @Column('varchar', {
    name: 'path_photo',
    length: 500,
    nullable: true,
  })
  path_photo?: string;

  @Factory((faker) =>
    faker.helpers
      .arrayElements(['ACTIVO', 'INACTIVO', 'SIN STOCK'])
      .find((e) => e),
  )
  @Column('varchar', {
    name: 'status',
    length: 100,
  })
  status?: string;

  @OneToMany(() => VehicleProductsProductEntity, (r) => r.product, {
    cascade: true,
  })
  vehicleProductsProduct?: VehicleProductsProductEntity[];

  constructor(opts?: PartialType<Product>) {
    this.id = opts?.id;
    this.updated_at = opts?.updated_at;
    this.deleted_at = opts?.deleted_at;
    this.created_at = opts?.created_at;
    this.damage_frequency = opts?.damage_frequency;
    this.name = opts?.name;
    this.sale_price = opts?.sale_price;
    this.path_photo = opts?.path_photo;
    this.status = opts?.status;
    this.vehicleProductsProduct = opts?.vehicleProductsProduct;
  }
}
