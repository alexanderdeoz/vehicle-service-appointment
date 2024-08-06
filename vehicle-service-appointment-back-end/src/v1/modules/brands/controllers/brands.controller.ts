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
import { BrandsService } from '../services/brands.service';
import {
  CreateBrandDto,
  FilterBrandDto,
  UpdateBrandDto,
} from '@v1/modules/brands/dto';
import { AuthHttp } from '@v1/shared/decorators';
import { AppRoute, Version } from '@v1/shared/enum';
import { ApiTags } from '@nestjs/swagger';
import { Brand } from '@v1/modules/brands/entities';

@AuthHttp()
@ApiTags(AppRoute.brands)
@Controller({
  path: AppRoute.brands,
  version: Version.V1,
})
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    return await this.brandsService.create(createBrandDto);
  }

  @Get()
  async findAll(@Query() params: FilterBrandDto<Brand>) {
    return await this.brandsService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.brandsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return await this.brandsService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.brandsService.remove(+id);
  }
}
