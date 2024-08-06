import { Global, Module } from '@nestjs/common';
import { PermissionsService } from './services/permissions.service';
import { PermissionsController } from '@v1/modules/permissions/controllers';
import { Repositories } from '@v1/modules/permissions/providers/repositories';

@Global()
@Module({
  controllers: [PermissionsController],
  providers: [...Repositories, PermissionsService],
  exports: [...Repositories],
})
export class PermissionsModule {}
