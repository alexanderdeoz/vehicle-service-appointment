import { Inject, Injectable } from '@nestjs/common';
import {
  CreateVehicleDto,
  FilterVehicleDto,
  UpdateVehicleDto,
} from '@v1/modules/vehicles/dto';
import { Vehicle } from '@v1/modules/vehicles/entities';
import { IServerResponseModel } from '@v1/shared/models';
import { Repository } from 'typeorm';
import { SeverityMessage } from '@v1/shared/enum';
import { PaginationDto } from '@v1/shared/dto';

@Injectable()
export class VehiclesService {
  constructor(@Inject(Vehicle) private readonly repo: Repository<Vehicle>) {}

  async create(createVehicleDto: CreateVehicleDto) {
    const data = await this.repo.save(createVehicleDto);
    return {
      data,
      message: {
        summary: 'Creado correctamente',
        detail: `vehículo ${data.id}`,
        severity: SeverityMessage.success,
      },
    };
  }

  async findAll(
    params: FilterVehicleDto<Vehicle>,
  ): Promise<IServerResponseModel<Vehicle[]>> {
    const { page, limit } = params;
    const [entities, totalItems] = await this.repo.findAndCount({
      take: limit,
      relations: {
        brand: true,
        model: true,
        fuel: true,
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
    const entity = await this.repo.findOneByOrFail({ id });
    return {
      data: entity,
    };
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    await this.repo.update(id, updateVehicleDto);
    return {
      data: null,
      message: {
        summary: 'Actualizado correctamente',
        detail: `vehículo ${id}`,
        severity: SeverityMessage.success,
      },
    };
  }

  async remove(id: number) {
    await this.repo.remove({ id });
    return {
      data: null,
      message: {
        summary: 'Eliminado correctamente',
        detail: `vehículo ${id}`,
        severity: SeverityMessage.success,
      },
    };
  }

  async getReportAllStatus(id: number) {
    const vehicle = await this.repo.findOneOrFail({
      where: { id },
      relations: { appointmentVehicle: { appointment: true, vehicle: true } },
    });
    return {
      data: vehicle,
    };
  }
}
