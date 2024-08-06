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
import { PermissionsService } from '../services/permissions.service';
import {
  CreatePermissionDto,
  FilterPermissionDto,
  UpdatePermissionDto,
} from '@v1/modules/permissions/dto';
import { ApiTags } from '@nestjs/swagger';
import { AppRoute, Version } from '@v1/shared/enum';
import { AuthHttp } from '@v1/shared/decorators';
import { Permission } from '@v1/modules/permissions/entities';

@AuthHttp()
@ApiTags(AppRoute.permissions)
@Controller({
  path: AppRoute.permissions,
  version: Version.V1,
})
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    return await this.permissionsService.create(createPermissionDto);
  }

  @Get()
  async findAll(@Query() params: FilterPermissionDto<Permission>) {
    return await this.permissionsService.findAll(params);
  }

  @Get('without-pagination')
  async findAllWithoutPagination() {
    return await this.permissionsService.findAllWithoutPagination();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.permissionsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return await this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.permissionsService.remove(+id);
  }
}
