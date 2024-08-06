import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  FilterUserDto,
  UpdateUserDto,
} from '@v1/modules/users/dto';
import { Repository } from 'typeorm';
import { User } from '@v1/modules/users/entities';
import { IServerResponseModel } from '@v1/shared/models';
import { SeverityMessage } from '@v1/shared/enum';
import { PaginationDto } from '@v1/shared/dto';

@Injectable()
export class UsersService {
  constructor(@Inject(User) private readonly repo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const data = await this.repo.save(createUserDto);
    return {
      data,
      message: {
        summary: 'Creado correctamente',
        detail: `usuario ${data.id}`,
        severity: SeverityMessage.success,
      },
    };
  }

  async findAll(
    params: FilterUserDto<User>,
  ): Promise<IServerResponseModel<User[]>> {
    const { page, limit } = params;
    const [entities, totalItems] = await this.repo.findAndCount({
      relations: {
        user_permissions: {
          permission: true,
          entity_from_system: true,
          user: true,
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

  async findAllWithoutPagination(): Promise<IServerResponseModel<User[]>> {
    const entities = await this.repo.find({
      relations: {
        user_permissions: {
          permission: true,
          entity_from_system: true,
          user: true,
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
    const entity = await this.repo.findOneOrFail({
      where: {
        id,
      },
      relations: {
        user_permissions: {
          permission: true,
          entity_from_system: true,
        },
        roles: {
          role: {
            role_permissions: {
              permission: true,
              entity_from_system: true,
            },
          },
        },
      },
    });
    return {
      data: entity,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.repo.save(updateUserDto);
    return {
      data: null,
      message: {
        summary: 'Actualizado correctamente',
        detail: `usuario ${id}`,
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
        detail: `usuario ${id}`,
        severity: SeverityMessage.success,
      },
    };
  }
}
