import { Global, Module } from '@nestjs/common';
import { AppointmentsService } from './services/appointments.service';
import { AppointmentsController } from '@v1/modules/appointments/controllers';
import { Repositories } from '@v1/modules/appointments/providers/repositories';

@Global()
@Module({
  controllers: [AppointmentsController],
  providers: [...Repositories, AppointmentsService],
  exports: [...Repositories],
})
export class AppointmentsModule {}
