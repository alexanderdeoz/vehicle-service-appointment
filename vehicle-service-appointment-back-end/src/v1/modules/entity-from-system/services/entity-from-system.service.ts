import { Inject, Injectable } from '@nestjs/common';
import {
  CreateEntityFromSystemDto,
  UpdateEntityFromSystemDto,
} from '@v1/modules/entity-from-system/dto';
import { EntityFromSystem } from '@v1/modules/entity-from-system/entities';
import { Repository } from 'typeorm';
import { SeverityMessage } from '@v1/shared/enum';
import { PaginationDto } from '@v1/shared/dto';
import { FilterEntityFromSystemDto } from '@v1/modules/entity-from-system/dto/filter-entity-from-system.dto';
import { IServerResponseModel } from '@v1/shared/models';

@Injectable()
export class EntityFromSystemService {
  constructor(
    @Inject(EntityFromSystem)
    private readonly repos: Repository<EntityFromSystem>,
  ) {}

  async create(createEntityDto: CreateEntityFromSystemDto) {
    const data = await this.repos.save(createEntityDto);
    return {
      data,
      message: {
        summary: 'Creado correctamente',
        detail: `entidad del sistema ${data.id}`,
        severity: SeverityMessage.success,
      },
    };
  }

  async findAll(params: FilterEntityFromSystemDto<EntityFromSystem>) {
    const { page, limit } = params;
    const [entities, totalItems] = await this.repos.findAndCount({
      relations: {
        entityFromSystemPermission: {
          entityFromSystem: true,
          permission: true,
        },
      },
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

  async findAllWithoutPagination() {
    const entities = await this.repos.find({
      relations: {
        entityFromSystemPermission: {
          entityFromSystem: true,
          permission: true,
        },
      },
      order: {
        id: 'ASC',
      },
    });
    return {
      data: entities,
    };
  }

  async findOne(id: number) {
    const entity = await this.repos.findOneOrFail({
      where: {
        id,
      },
      relations: {
        entityFromSystemPermission: {
          entityFromSystem: true,
          permission: true,
        },
      },
    });
    return {
      data: entity,
    };
  }

  async update(id: number, updateEntityDto: UpdateEntityFromSystemDto) {
    await this.repos.save(updateEntityDto);
    return {
      data: null,
      message: {
        summary: 'Actualizado correctamente',
        detail: `entidad del sistema ${id}`,
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
        detail: `entidad del sistema ${id}`,
        severity: SeverityMessage.success,
      },
    };
  }

  async findAllMenuOption(): Promise<IServerResponseModel<EntityFromSystem[]>> {
    const entities = await this.repos.find({
      relations: {
        father: true,
        entityFromSystemPermission: {
          entityFromSystem: true,
          permission: true,
        },
      },
    });
    const fathers: EntityFromSystem[] = [];
    const findChildren = (father: EntityFromSystem) => {
      return entities
        .filter((e) => e?.father?.id == father.id)
        .map((e) => {
          e.children = findChildren(e);
          return e;
        });
    };
    for (const entity of entities) {
      if (!entity.father) {
        entity.children = findChildren(entity);
        fathers.push(entity);
      }
    }
    return {
      data: fathers,
    };
  }
}
