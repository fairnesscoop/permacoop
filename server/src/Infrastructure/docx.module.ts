import { Module, DynamicModule } from '@nestjs/common';

import { DocxAdapter } from './Adapter/DocxAdapter';
import { DocxOptions, DOCX_OPTIONS_TOKEN } from './docx.interfaces';

const providers = [{ provide: 'IDocxService', useClass: DocxAdapter }];

@Module({
  providers: [...providers],
  exports: [...providers]
})
export class DocxModule {
  static register(options: DocxOptions): DynamicModule {
    return {
      module: DocxModule,
      providers: [{ provide: DOCX_OPTIONS_TOKEN, useValue: options }]
    };
  }
}
