import { Inject, Injectable } from '@nestjs/common';
import {
  CreatePermissionDto,
  FilterPermissionDto,
  UpdatePermissionDto,
} from '@v1/modules/permissions/dto';
import { Repository } from 'typeorm';
import { Permission } from '@v1/modules/permissions/entities';
import { IServerResponseModel } from '@v1/shared/models';
import { SeverityMessage } from '@v1/shared/enum';
import { PaginationDto } from '@v1/shared/dto';

@Injectable()
export class PermissionsService {
  constructor(
    @Inject(Permission) private readonly repos: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const data = await this.repos.save(createPermissionDto);
    return {
      data,
      message: {
        summary: 'Creado correctamente',
        detail: `permiso ${data.id}`,
        severity: SeverityMessage.success,
      },
    };
  }

  async findAll(
    params: FilterPermissionDto<Permission>,
  ): Promise<IServerResponseModel<Permission[]>> {
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

  async findAllWithoutPagination(): Promise<
    IServerResponseModel<Permission[]>
  > {
    const entities = await this.repos.find({
      order: {
        id: 'ASC',
      },
    });
    return {
      data: entities,
    };
  }

  async findOne(id: number) {
    const entity = await this.repos.findOneByOrFail({ id });
    return {
      data: entity,
    };
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    await this.repos.update(id, updatePermissionDto);
    return {
      data: null,
      message: {
        summary: 'Actualizado correctamente',
        detail: `permiso ${id}`,
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
        detail: `permiso ${id}`,
        severity: SeverityMessage.success,
      },
    };
  }
}
