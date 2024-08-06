import { Inject, Injectable } from '@nestjs/common';
import {
  CreateRoleDto,
  FilterRoleDto,
  FindAllPermissionsByRoleDto,
  UpdateRoleDto,
} from '@v1/modules/roles/dto';
import { In, Repository } from 'typeorm';
import { IServerResponseModel } from '@v1/shared/models';
import { Role } from '@v1/modules/roles/entities';
import { SeverityMessage } from '@v1/shared/enum';
import { PaginationDto } from '@v1/shared/dto';

@Injectable()
export class RolesService {
  constructor(@Inject(Role) private readonly repos: Repository<Role>) {}

  async create(createRoleDto: CreateRoleDto) {
    const data = await this.repos.save(createRoleDto);
    return {
      data,
      message: {
        summary: 'Creado correctamente',
        detail: `rol ${data.id}`,
        severity: SeverityMessage.success,
      },
    };
  }

  async findAll(
    params: FilterRoleDto<Role>,
  ): Promise<IServerResponseModel<Role[]>> {
    const { page, limit } = params;
    const [entities, totalItems] = await this.repos.findAndCount({
      take: limit,
      relations: {
        role_permissions: {
          permission: true,
          role: true,
          entity_from_system: true,
        },
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

  async findAllWithoutPagination(): Promise<IServerResponseModel<Role[]>> {
    const entities = await this.repos.find({
      relations: {
        role_permissions: {
          permission: true,
          role: true,
          entity_from_system: true,
        },
      },
      order: { id: 'ASC' },
    });
    return {
      data: entities,
    };
  }

  async findAllPermissionsByRole(
    params: FindAllPermissionsByRoleDto<Role>,
  ): Promise<IServerResponseModel<Role[]>> {
    const entities = await this.repos.find({
      where: {
        id: In(params.rol_ids),
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

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.repos.save(updateRoleDto);
    return {
      data: null,
      message: {
        summary: 'Actualizado correctamente',
        detail: `rol ${id}`,
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
        detail: `rol ${id}`,
        severity: SeverityMessage.success,
      },
    };
  }
}
