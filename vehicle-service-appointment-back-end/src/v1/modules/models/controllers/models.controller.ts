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
import { ModelsService } from '../services/models.service';
import {
  CreateModelDto,
  FilterModelDto,
  UpdateModelDto,
} from '@v1/modules/models/dto';
import { ApiTags } from '@nestjs/swagger';
import { AppRoute, Version } from '@v1/shared/enum';
import { AuthHttp } from '@v1/shared/decorators';
import { Model } from '@v1/modules/models/entities';

@AuthHttp()
@ApiTags(AppRoute.models)
@Controller({
  path: AppRoute.models,
  version: Version.V1,
})
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Post()
  async create(@Body() createModelDto: CreateModelDto) {
    return await this.modelsService.create(createModelDto);
  }

  @Get()
  async findAll(@Query() params: FilterModelDto<Model>) {
    return await this.modelsService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.modelsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateModelDto: UpdateModelDto,
  ) {
    return await this.modelsService.update(+id, updateModelDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.modelsService.remove(+id);
  }
}
