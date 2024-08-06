import { Global, Module } from '@nestjs/common';
import { CoreService } from './services/core.service';
import { CoreController } from '@v1/modules/core/controllers';
import { PdfService } from '@v1/modules/core/services/pdf.service';

@Global()
@Module({
  controllers: [CoreController],
  providers: [CoreService, PdfService],
  exports: [PdfService],
})
export class CoreModule {}
