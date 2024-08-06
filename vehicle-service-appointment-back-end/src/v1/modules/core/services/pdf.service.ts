import { Injectable } from '@nestjs/common';
import { generatePDF } from '@bkrajendra/nestjs-pdf-lib';

@Injectable()
export class PdfService {
  public async generateHdbBuffer(
    filePath: string,
    options?: object,
    data?: object,
    puppeteer_options?: any,
    outputPath?: string,
  ): Promise<any> {
    return await generatePDF(
      filePath,
      options,
      data,
      puppeteer_options,
      outputPath,
    );
  }
}
