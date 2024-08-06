import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoreService } from '../services/core.service';
import { InitAppDto } from '@v1/modules/core/dto';
import { ApiTags } from '@nestjs/swagger';
import { AppRoute, Version } from '@v1/shared/enum';
import { PublicRoute } from '@v1/shared/decorators';
import { Route } from '@v1/modules/core/enums';

@ApiTags(AppRoute.core)
@Controller({
  path: AppRoute.core,
  version: Version.V1,
})
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @PublicRoute()
  @Post(Route.initApp)
  async initApp(@Body() payload: InitAppDto) {
    return await this.coreService.initApp(payload);
  }

  @Get(Route.dataDashboard)
  async dataDashboard() {
    return await this.coreService.dataDashboard();
  }
}
