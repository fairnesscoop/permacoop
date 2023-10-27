import { Module } from '@nestjs/common';
import { RowFactory } from './RowFactory';
import { TemplatesModule } from '../Templates/templates.module';
import { TranslationsModule } from '../Translations/translations.module';
import { TableCsvFactory } from './TableCsvFactory';

const providers = [RowFactory, TableCsvFactory];

@Module({
  imports: [TemplatesModule, TranslationsModule],
  providers: [...providers],
  exports: [...providers]
})
export class TablesModule {}
