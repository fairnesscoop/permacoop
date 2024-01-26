import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FluentTranslatorAdapter } from '../Adapter/FluentTranslatorAdapter';

const providers = [
  { provide: 'ITranslator', useClass: FluentTranslatorAdapter }
];

@Module({
  imports: [ConfigModule],
  providers: [...providers],
  exports: [...providers]
})
export class TranslationsModule {}
