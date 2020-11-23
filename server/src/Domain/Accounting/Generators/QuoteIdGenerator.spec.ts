import { mock, instance, when } from 'ts-mockito';
import { ConfigService } from '@nestjs/config';
import { QuoteRepository } from 'src/Infrastructure/Accounting/Repository/QuoteRepository';
import { QuoteIdGenerator } from './QuoteIdGenerator';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';

describe('QuoteIdGenerator', () => {
  it('testGenerate', async () => {
    const quoteRepository: QuoteRepository = mock(QuoteRepository);
    const dateUtils: DateUtilsAdapter = mock(DateUtilsAdapter);
    const configService: ConfigService = mock(ConfigService);

    const generator = new QuoteIdGenerator(
      instance(quoteRepository),
      instance(dateUtils),
      instance(configService)
    );

    when(configService.get('ACCOUNTING_QUOTE_PREFIX')).thenResolve('FS-DEVIS');
    when(configService.get('ACCOUNTING_PAD')).thenResolve(4);
    when(dateUtils.getCurrentDate()).thenReturn(new Date('2020-04-07'));
    when(quoteRepository.countByYear(2020)).thenResolve(0);
    expect(await generator.generate()).toBe('FS-DEVIS-2020-0001');
  });
});
