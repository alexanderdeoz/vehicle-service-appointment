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
import { VehiclesService } from '../services/vehicles.service';
import {
  CreateVehicleDto,
  FilterVehicleDto,
  UpdateVehicleDto,
} from '@v1/modules/vehicles/dto';
import { ApiTags } from '@nestjs/swagger';
import { AppRoute, Version } from '@v1/shared/enum';
import { AuthHttp } from '@v1/shared/decorators';
import { Vehicle } from '@v1/modules/vehicles/entities';

@AuthHttp()
@ApiTags(AppRoute.vehicles)
@Controller({
  path: AppRoute.vehicles,
  version: Version.V1,
})
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return await this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  async findAll(@Query() params: FilterVehicleDto<Vehicle>) {
    return await this.vehiclesService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.vehiclesService.findOne(+id);
  }

  @Get('report-all-status/:id')
  async getReportAllStatus(@Param('id') id: string) {
    return await this.vehiclesService.getReportAllStatus(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return await this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.vehiclesService.remove(+id);
  }
}
