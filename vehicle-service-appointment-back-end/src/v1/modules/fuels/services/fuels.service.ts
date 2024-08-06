import { Inject, Injectable } from '@nestjs/common';
import {
  CreateFuelDto,
  FilterFuelDto,
  UpdateFuelDto,
} from '@v1/modules/fuels/dto';
import { Repository } from 'typeorm';
import { Fuel } from '@v1/modules/fuels/entities';
import { Brand } from '@v1/modules/brands/entities';
import { PaginationDto } from '@v1/shared/dto';
import { SeverityMessage } from '@v1/shared/enum';

@Injectable()
export class FuelsService {
  constructor(@Inject(Fuel) private readonly repos: Repository<Fuel>) {}

  async create(createFuelDto: CreateFuelDto) {
    const newBrand = await this.repos.save(createFuelDto);
    return {
      data: newBrand,
      message: {
        summary: 'Creado correctamente',
        detail: `combustible ${newBrand.id}`,
        severity: SeverityMessage.success,
      },
    };
  }

  async findAll(params: FilterFuelDto<Brand>) {
    const { page, limit } = params;
    const [brands, totalItems] = await this.repos.findAndCount({
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: params.orderValue(),
      select: params.selectValue(),
    });
    return {
      data: brands,
      pagination: {
        totalItems,
        limit: limit,
        page,
      },
    };
  }

  async findOne(id: number) {
    const entity = await this.repos.findOne({ where: { id } });
    return {
      data: entity,
    };
  }

  async update(_: number, updateFuelDto: UpdateFuelDto) {
    const data = await this.repos.save(updateFuelDto);
    return {
      data: data,
      message: {
        summary: 'Actualizado correctamente',
        detail: `combustible ${data.id}`,
        severity: SeverityMessage.success,
      },
    };
  }

  async remove(id: number) {
    await this.repos.softRemove({ id });
    return {
      data: null,
      message: {
        summary: 'Eliminado correctamente',
        detail: `combustible ${id}`,
        severity: SeverityMessage.success,
      },
    };
  }
}
