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
import { UsersService } from '../services/users.service';
import {
  CreateUserDto,
  FilterUserDto,
  UpdateUserDto,
} from '@v1/modules/users/dto';
import { ApiTags } from '@nestjs/swagger';
import { AppRoute, Version } from '@v1/shared/enum';
import { AuthHttp, PublicRoute } from '@v1/shared/decorators';
import { User } from '@v1/modules/users/entities';

@AuthHttp()
@ApiTags(AppRoute.users)
@Controller({
  path: AppRoute.users,
  version: Version.V1,
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PublicRoute()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() params: FilterUserDto<User>) {
    return await this.usersService.findAll(params);
  }

  @Get('without-pagination')
  async findAllWithoutPagination() {
    return await this.usersService.findAllWithoutPagination();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // const pay = JSON.parse(JSON.stringify(updateUserDto));
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
