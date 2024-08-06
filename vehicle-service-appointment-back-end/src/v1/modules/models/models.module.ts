import { Global, Module } from '@nestjs/common';
import { ModelsService } from './services/models.service';
import { ModelsController } from '@v1/modules/models/controllers';
import { Repositories } from '@v1/modules/models/providers';

@Global()
@Module({
  controllers: [ModelsController],
  providers: [ModelsService, ...Repositories],
  exports: [ModelsService, ...Repositories],
})
export class ModelsModule {}
