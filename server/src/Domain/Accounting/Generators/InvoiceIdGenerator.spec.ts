import { mock, instance, when } from 'ts-mockito';
import { ConfigService } from '@nestjs/config';
import { InvoiceRepository } from 'src/Infrastructure/Accounting/Repository/InvoiceRepository';
import { InvoiceIdGenerator } from './InvoiceIdGenerator';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';

describe('InvoiceIdGenerator', () => {
  it('testGenerate', async () => {
    const invoiceRepository: InvoiceRepository = mock(InvoiceRepository);
    const dateUtils: DateUtilsAdapter = mock(DateUtilsAdapter);
    const configService: ConfigService = mock(ConfigService);

    const generator = new InvoiceIdGenerator(
      instance(invoiceRepository),
      instance(dateUtils),
      instance(configService)
    );

    when(configService.get('ACCOUNTING_INVOICE_PREFIX')).thenResolve('FS');
    when(configService.get('ACCOUNTING_PAD')).thenResolve(4);
    when(dateUtils.getCurrentDate()).thenReturn(new Date('2020-04-07'));
    when(invoiceRepository.countByYear(2020)).thenResolve(0);
    expect(await generator.generate()).toBe('FS-2020-0001');
  });
});
