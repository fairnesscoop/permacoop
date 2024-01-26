import { Module } from '@nestjs/common';
import { ExtendedRoutingModule } from '../Common/ExtendedRouting/extendedRouting.module';
import { TranslationsModule } from '../Translations/translations.module';
import { NunjucksTemplates } from './NunjucksTemplates/NunjucksTemplates';

const providers = [{ provide: 'ITemplates', useClass: NunjucksTemplates }];

@Module({
  imports: [ExtendedRoutingModule, TranslationsModule],
  providers: [...providers],
  exports: [...providers]
})
export class TemplatesModule {}
