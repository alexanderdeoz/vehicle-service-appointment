import { Inject, Injectable } from '@nestjs/common';
import {
  CreateBrandDto,
  FilterBrandDto,
  UpdateBrandDto,
} from '@v1/modules/brands/dto';
import { Brand } from '@v1/modules/brands/entities';
import { Repository } from 'typeorm';
import { SeverityMessage } from '@v1/shared/enum';
import { IServerResponseModel } from '@v1/shared/models';
import { PaginationDto } from '@v1/shared/dto';

@Injectable()
export class BrandsService {
  constructor(@Inject(Brand) private readonly repos: Repository<Brand>) {}

  async create(
    createBrandDto: CreateBrandDto,
  ): Promise<IServerResponseModel<Brand>> {
    const newBrand = await this.repos.save(createBrandDto);
    return {
      data: newBrand,
      message: {
        summary: 'Creado correctamente',
        detail: `marca ${newBrand.id}`,
        severity: SeverityMessage.success,
      },
    };
  }

  async findAll(params: FilterBrandDto<Brand>) {
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

  async update(_: number, updateBrandDto: UpdateBrandDto) {
    const data = await this.repos.save(updateBrandDto);
    return {
      data: data,
      message: {
        summary: 'Actualizado correctamente',
        detail: `marca ${data.id}`,
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
        detail: `marca ${id}`,
        severity: SeverityMessage.success,
      },
    };
  }
}
