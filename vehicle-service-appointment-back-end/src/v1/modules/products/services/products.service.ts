import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '@v1/modules/products/dto';
import { Repository } from 'typeorm';
import { IServerResponseModel } from '@v1/shared/models';
import { Product } from '@v1/modules/products/entities';
import { SeverityMessage } from '@v1/shared/enum';
import { PaginationDto } from '@v1/shared/dto';

@Injectable()
export class ProductsService {
  constructor(@Inject(Product) private readonly repos: Repository<Product>) {}

  async create(createProductDto: CreateProductDto) {
    const data = await this.repos.save(createProductDto);
    return {
      data,
      message: {
        summary: 'Creado correctamente',
        detail: `producto ${data.id}`,
        severity: SeverityMessage.success,
      },
    };
  }

  async findAll(
    params: FilterProductDto<Product>,
  ): Promise<IServerResponseModel<Product[]>> {
    const { page, limit } = params;
    const [entities, totalItems] = await this.repos.findAndCount({
      take: limit,
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
    const entity = await this.repos.findOneByOrFail({ id });
    return {
      data: entity,
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.repos.update(id, updateProductDto);
    return {
      data: null,
      message: {
        summary: 'Actualizado correctamente',
        detail: `producto ${id}`,
        severity: SeverityMessage.success,
      },
    };
  }

  async remove(id: number) {
    await this.repos.remove({ id });
    return {
      data: null,
      message: {
        summary: 'Eliminado correctamente',
        detail: `producto ${id}`,
        severity: SeverityMessage.success,
      },
    };
  }
}
