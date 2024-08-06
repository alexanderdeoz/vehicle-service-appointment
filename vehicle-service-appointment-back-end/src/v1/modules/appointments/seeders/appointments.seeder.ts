import { Inject, Injectable } from '@nestjs/common';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import {
  Appointment,
  AppointmentVehiclesVehicleEntity,
} from '@v1/modules/appointments/entities';
import {
  Vehicle,
  VehicleProductsProductEntity,
} from '@v1/modules/vehicles/entities';
import { Product } from '@v1/modules/products/entities';
import { User } from '@v1/modules/users/entities';

@Injectable()
export class AppointmentsSeeder implements Seeder {
  constructor(
    @Inject(User)
    private readonly userRepo: Repository<User>,
    @Inject(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @Inject(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,
    @Inject(Product)
    private readonly productRepo: Repository<Product>,
    @Inject(AppointmentVehiclesVehicleEntity)
    private readonly appointmentVehiclesVehicleRepo: Repository<AppointmentVehiclesVehicleEntity>,
    @Inject(VehicleProductsProductEntity)
    private readonly vehicleProductsProductRepo: Repository<VehicleProductsProductEntity>,
  ) {}

  async seed(): Promise<any> {
    const users = await this.userRepo.find();
    const appointmentsPayload = DataFactory.createForClass(Appointment)
      .generate(25)
      .map<Appointment>((e) => {
        const indexU = Math.floor(Math.random() * users.length);
        const indexM = Math.floor(Math.random() * users.length);
        return {
          ...(e as DeepPartial<any>),
          user: users[indexU],
          mechanic: users[indexM],
        };
      });
    const appointments: Appointment[] =
      await this.appointmentRepo.save(appointmentsPayload);
    const vehicles = await this.vehicleRepo.find();
    const products = await this.productRepo.find();

    for (const appointment of appointments) {
      for (let i = 0; i < 3; i++) {
        const avv = DataFactory.createForClass(AppointmentVehiclesVehicleEntity)
          .generate(3)
          .map<AppointmentVehiclesVehicleEntity>((e) => {
            const index = Math.floor(Math.random() * vehicles.length);
            return {
              ...(e as DeepPartial<any>),
              appointment,
              vehicle: vehicles[index],
            };
          });
        await this.appointmentVehiclesVehicleRepo.save(avv);
      }

      for (let i = 0; i < 3; i++) {
        const avv = DataFactory.createForClass(VehicleProductsProductEntity)
          .generate(3)
          .map<VehicleProductsProductEntity>((e) => {
            const indexV = Math.floor(Math.random() * vehicles.length);
            const indexP = Math.floor(Math.random() * products.length);
            return {
              ...(e as DeepPartial<any>),
              appointment,
              vehicle: vehicles[indexV],
              product: products[indexP],
            };
          });
        await this.vehicleProductsProductRepo.save(avv);
      }
    }

    return null;
  }

  async drop(): Promise<any> {
    await this.appointmentRepo.delete({});
    // await this.appointmentVehiclesVehicleRepo.delete({});
    return null;
  }
}
