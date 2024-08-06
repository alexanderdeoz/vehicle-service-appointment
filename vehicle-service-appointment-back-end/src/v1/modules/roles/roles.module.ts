import { Global, Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { RolesController } from '@v1/modules/roles/controllers';
import { Repositories } from '@v1/modules/roles/providers';

@Global()
@Module({
  controllers: [RolesController],
  providers: [...Repositories, RolesService],
  exports: [...Repositories],
})
export class RolesModule {}
