import { Global, Module } from '@nestjs/common';
import { VehiclesService } from './services/vehicles.service';
import { VehiclesController } from '@v1/modules/vehicles/controllers';
import { Repositories } from '@v1/modules/vehicles/providers/repositories';

@Global()
@Module({
  controllers: [VehiclesController],
  providers: [...Repositories, VehiclesService],
  exports: [...Repositories],
})
export class VehiclesModule {}
