import { Global, Module } from '@nestjs/common';
import { FuelsService } from './services/fuels.service';
import { FuelsController } from '@v1/modules/fuels/controllers';
import { Repositories } from '@v1/modules/fuels/providers';

@Global()
@Module({
  controllers: [FuelsController],
  providers: [FuelsService, ...Repositories],
  exports: [FuelsService, ...Repositories],
})
export class FuelsModule {}
