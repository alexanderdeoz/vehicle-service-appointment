import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from '@v1/modules/appointments/dto';
import {
  Appointment,
  AppointmentVehiclesVehicleEntity,
  MechanicWithFewerAppointmentsEntity,
} from '@v1/modules/appointments/entities';
import { Repository } from 'typeorm';
import { IServerResponseModel } from '@v1/shared/models';
import { SeverityMessage } from '@v1/shared/enum';
import { FilterAppointmentDto } from '@v1/modules/appointments/dto/filter-appointment.dto';
import { PaginationDto } from '@v1/shared/dto';
import {
  Vehicle,
  VehicleProductsProductEntity,
} from '@v1/modules/vehicles/entities';
import { CreateVehicleDto } from '@v1/modules/vehicles/dto';
import { PdfService } from '@v1/modules/core/services/pdf.service';
import * as path from 'path';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { Product } from '@v1/modules/products/entities';
import { User } from '@v1/modules/users/entities';

@Injectable()
export class AppointmentsService {
  constructor(
    @Inject(Appointment)
    private readonly appointmentRepos: Repository<Appointment>,
    @Inject(Vehicle) private readonly vehicleRepos: Repository<Vehicle>,
    @Inject(Product) private readonly productRepos: Repository<Product>,
    @Inject(VehicleProductsProductEntity)
    private readonly vehicleProductsProductRepo: Repository<VehicleProductsProductEntity>,
    @Inject(AppointmentVehiclesVehicleEntity)
    private readonly appointmentVehiclesVehicleRepo: Repository<AppointmentVehiclesVehicleEntity>,
    @Inject(User)
    private readonly userRepo: Repository<User>,
    @Inject(MechanicWithFewerAppointmentsEntity)
    private readonly mechanicWithFewerAppointmentsView: Repository<MechanicWithFewerAppointmentsEntity>,
    private readonly pdfService: PdfService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, userAuth: User) {
    const mechanic = await this.mechanicWithFewerAppointmentsView.find({
      relations: { mechanic: true },
    });

    if (!mechanic || mechanic.length == 0) {
      throw new UnprocessableEntityException(
        'No se pudo encontrar mecánico para asignar',
      );
    }

    // guardando cita
    const newAppointment = await this.appointmentRepos.create({
      user: userAuth,
      mechanic: mechanic.find((e) => e).mechanic,
      status: createAppointmentDto?.status,
      scheduled_at: createAppointmentDto?.scheduled_at,
      description: createAppointmentDto?.description,
      valid_until_at: createAppointmentDto?.valid_until_at,
      reason: createAppointmentDto?.reason,
    } as DeepPartial<Appointment>);
    const appointment =
      await this.appointmentRepos.save<Appointment>(newAppointment);

    // guardando vehículos de la cita
    for (const appointmentVehicle of createAppointmentDto.appointmentVehicle) {
      let vehicle = await this.vehicleRepos.findOneBy({
        plate: appointmentVehicle?.vehicle?.plate,
      });
      if (!vehicle) {
        const v = new Vehicle(appointmentVehicle?.vehicle);
        vehicle = await this.vehicleRepos.save(v);
      }
      await this.appointmentVehiclesVehicleRepo.save({
        damage_percentage: appointmentVehicle.damage_percentage,
        type_service: appointmentVehicle.type_service,
        status_service: appointmentVehicle.status_service,
        vehicle: vehicle,
        appointment: appointment,
      } as DeepPartial<AppointmentVehiclesVehicleEntity>);
    }

    // guardando productos de vehículos de la cita
    for (const vehicleProduct of createAppointmentDto.appointmentProducts) {
      let child: VehicleProductsProductEntity | undefined = undefined;
      const vehicle = await this.vehicleRepos.findOneByOrFail({
        plate: vehicleProduct.vehicle.plate,
      });
      if (vehicleProduct.repair) {
        const product = (
          await this.productRepos.findOneByOrFail({
            id: vehicleProduct.child.product_id,
          })
        ).id;
        child = await this.vehicleProductsProductRepo.save({
          vehicle: vehicle,
          product: product,
          appointment: appointment,
          repair: vehicleProduct.child.repair,
        } as DeepPartial<VehicleProductsProductEntity>);
      }
      const product = (
        await this.productRepos.findOneByOrFail({
          id: vehicleProduct.product_id,
        })
      ).id;
      await this.vehicleProductsProductRepo.save({
        vehicle: vehicle,
        product: product,
        appointment: appointment,
        repair: vehicleProduct.repair,
        child: child,
      } as DeepPartial<VehicleProductsProductEntity>);
    }
    return {
      data: appointment,
      message: {
        summary: 'Creado correctamente',
        detail: `cita ${appointment.id}`,
        severity: SeverityMessage.success,
        id: 'create-appointment',
      },
    };
  }

  async findAll(
    params: FilterAppointmentDto<Appointment>,
  ): Promise<IServerResponseModel<Appointment[]>> {
    const { page, limit } = params;
    const [entities, totalItems] = await this.appointmentRepos.findAndCount({
      take: limit,
      relations: {
        user: true,
        mechanic: true,
      },
      skip: PaginationDto.getOffset(limit, page),
      order: params.orderValue(),
      select: params.selectValue(),
    });
    return {
      data: entities,
      pagination: {
        totalItems,
        limit: limit,
        page,
      },
    };
  }

  async findOne(id: number) {
    const entity = await this.appointmentRepos.findOne({
      where: { id },
      relations: {
        appointmentVehicle: {
          vehicle: {
            brand: true,
            model: true,
            fuel: true,
          },
        },
        appointmentProducts: {
          vehicle: {
            brand: true,
            model: true,
            fuel: true,
          },
          product: true,
          child: {
            product: true,
          },
        },
      },
    });
    return {
      data: entity,
    };
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<IServerResponseModel<any>> {
    for (const appointmentVehicle of updateAppointmentDto.appointmentVehicle) {
      if (!appointmentVehicle?.vehicle_id) {
        const vehicle = new Vehicle(appointmentVehicle?.vehicle);
        await this.vehicleRepos.save(vehicle);
        appointmentVehicle.vehicle_id = vehicle.id;
        appointmentVehicle.vehicle = new CreateVehicleDto(vehicle);
      }
    }
    for (const vehicleProduct of updateAppointmentDto.appointmentProducts) {
      const product = new VehicleProductsProductEntity(vehicleProduct);
      await this.vehicleProductsProductRepo.save(product);
    }
    const data = await this.appointmentRepos.save(updateAppointmentDto);
    return {
      data: data,
      message: {
        summary: 'Actualizado correctamente',
        detail: `cita ${id}`,
        severity: SeverityMessage.success,
        id: 'update-appointment',
      },
    };
  }

  async remove(id: number) {
    await this.appointmentRepos.softRemove({ id });
    return {
      data: null,
      message: {
        summary: 'Eliminado correctamente',
        detail: `cita ${id}`,
        severity: SeverityMessage.success,
        id: 'remove-appointment',
      },
    };
  }

  async reportStatus(id: number): Promise<any> {
    const p = path.join(
      process.cwd(),
      'src/v1/modules/appointments/resources/views/report-status.hdb',
    );
    const appointment = await this.appointmentRepos.findOne({
      where: { id },
      relations: {
        user: true,
        mechanic: true,
        appointmentVehicle: { vehicle: true },
      },
    });
    const dateNow = new Date().toISOString();
    const title = `Reporte de estado - Cita No. ${appointment.id}`;
    return await this.pdfService.generateHdbBuffer(
      p,
      {},
      {
        title,
        dateNow,
        appointment,
      },
    );
  }

  async reportProductsRequest(id: number) {
    const p = path.join(
      process.cwd(),
      'src/v1/modules/appointments/resources/views/report-products-request.hdb',
    );
    const appointment = await this.appointmentRepos.findOne({
      where: { id },
      relations: {
        user: true,
        mechanic: true,
        appointmentProducts: {
          product: true,
          child: {
            product: true,
          },
        },
      },
    });
    const title = `Solicitud de productos - Cita No. ${appointment.id}`;
    const dateNow = new Date().toISOString();
    return await this.pdfService.generateHdbBuffer(
      p,
      {},
      {
        title,
        dateNow,
        appointment,
      },
    );
  }
}
