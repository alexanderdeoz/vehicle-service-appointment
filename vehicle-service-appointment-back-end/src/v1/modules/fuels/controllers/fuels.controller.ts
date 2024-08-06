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
import { FuelsService } from '../services/fuels.service';
import {
  CreateFuelDto,
  FilterFuelDto,
  UpdateFuelDto,
} from '@v1/modules/fuels/dto';
import { ApiTags } from '@nestjs/swagger';
import { AppRoute, Version } from '@v1/shared/enum';
import { AuthHttp } from '@v1/shared/decorators';
import { Brand } from '@v1/modules/brands/entities';

@AuthHttp()
@ApiTags(AppRoute.fuels)
@Controller({
  path: AppRoute.fuels,
  version: Version.V1,
})
export class FuelsController {
  constructor(private readonly fuelsService: FuelsService) {}

  @Post()
  create(@Body() createFuelDto: CreateFuelDto) {
    return this.fuelsService.create(createFuelDto);
  }

  @Get()
  async findAll(@Query() params: FilterFuelDto<Brand>) {
    return this.fuelsService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fuelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFuelDto: UpdateFuelDto) {
    return this.fuelsService.update(+id, updateFuelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fuelsService.remove(+id);
  }
}
