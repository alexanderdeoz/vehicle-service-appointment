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
import { RolesService } from '../services/roles.service';
import {
  CreateRoleDto,
  FilterRoleDto,
  UpdateRoleDto,
} from '@v1/modules/roles/dto';
import { ApiTags } from '@nestjs/swagger';
import { AppRoute, Version } from '@v1/shared/enum';
import { AuthHttp } from '@v1/shared/decorators';
import { Role } from '@v1/modules/roles/entities';

@AuthHttp()
@ApiTags(AppRoute.roles)
@Controller({
  path: AppRoute.roles,
  version: Version.V1,
})
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @Get()
  async findAll(@Query() params: FilterRoleDto<Role>) {
    return await this.rolesService.findAll(params);
  }

  @Get('without-pagination')
  async findAllWithoutPagination() {
    return await this.rolesService.findAllWithoutPagination();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.rolesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.rolesService.remove(+id);
  }
}
