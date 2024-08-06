import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EntityFromSystemService } from '../services/entity-from-system.service';
import {
  CreateEntityFromSystemDto,
  UpdateEntityFromSystemDto,
} from '@v1/modules/entity-from-system/dto';
import { AuthHttp } from '@v1/shared/decorators';
import { ApiTags } from '@nestjs/swagger';
import { AppRoute, Version } from '@v1/shared/enum';
import { FilterEntityFromSystemDto } from '@v1/modules/entity-from-system/dto/filter-entity-from-system.dto';
import { EntityFromSystem } from '@v1/modules/entity-from-system/entities';

@AuthHttp()
@ApiTags(AppRoute.entitiesFromSystem)
@Controller({
  path: AppRoute.entitiesFromSystem,
  version: Version.V1,
})
export class EntityFromSystemController {
  constructor(private readonly entitiesService: EntityFromSystemService) {}

  @Post()
  async create(@Body() createEntityDto: CreateEntityFromSystemDto) {
    return await this.entitiesService.create(createEntityDto);
  }

  @Get()
  async findAll(@Query() params: FilterEntityFromSystemDto<EntityFromSystem>) {
    return await this.entitiesService.findAll(params);
  }

  @Get('without-pagination')
  async findAllWithoutPagination() {
    return await this.entitiesService.findAllWithoutPagination();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.entitiesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEntityDto: UpdateEntityFromSystemDto,
  ) {
    return await this.entitiesService.update(+id, updateEntityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.entitiesService.remove(+id);
  }
}
