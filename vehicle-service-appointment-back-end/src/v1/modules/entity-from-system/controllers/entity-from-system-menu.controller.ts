import { Controller, Get } from '@nestjs/common';
import { EntityFromSystemService } from '../services/entity-from-system.service';
import { AuthHttp } from '@v1/shared/decorators';
import { ApiTags } from '@nestjs/swagger';
import { AppRoute, Version } from '@v1/shared/enum';

@AuthHttp()
@ApiTags(AppRoute.entitiesFromSystem)
@Controller({
  path: AppRoute.entitiesFromSystem,
  version: Version.V1,
})
export class EntityFromSystemMenuController {
  constructor(private readonly entitiesService: EntityFromSystemService) {}

  @Get('menu-options')
  async findAll() {
    return await this.entitiesService.findAllMenuOption();
  }
}
