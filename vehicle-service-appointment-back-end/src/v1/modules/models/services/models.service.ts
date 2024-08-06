import { Inject, Injectable } from '@nestjs/common';
import { CreateModelDto } from '../dto/create-model.dto';
import { UpdateModelDto } from '../dto/update-model.dto';
import { Repository } from 'typeorm';
import { Model } from '@v1/modules/models/entities';
import { FilterModelDto } from '@v1/modules/models/dto';
import { SeverityMessage } from '@v1/shared/enum';
import { PaginationDto } from '@v1/shared/dto';

@Injectable()
export class ModelsService {
  constructor(@Inject(Model) private readonly repos: Repository<Model>) {}

  async create(createModelDto: CreateModelDto) {
    const newBrand = await this.repos.save(createModelDto);
    return {
      data: newBrand,
      message: {
        summary: 'Creado correctamente',
        detail: `modelo ${newBrand.id}`,
        severity: SeverityMessage.success,
      },
    };
  }

  async findAll(params: FilterModelDto<Model>) {
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

  async update(_: number, updateModelDto: UpdateModelDto) {
    const data = await this.repos.save(updateModelDto);
    return {
      data: data,
      message: {
        summary: 'Actualizado correctamente',
        detail: `modelo ${data.id}`,
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
        detail: `modelo ${id}`,
        severity: SeverityMessage.success,
      },
    };
  }
}
