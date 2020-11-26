import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IInvoiceRepository } from '../Repository/IInvoiceRepository';
import { IDateUtils } from 'src/Application/IDateUtils';
import { AbstractGenerator } from './AbstractGenerator';

@Injectable()
export class InvoiceIdGenerator extends AbstractGenerator {
  constructor(
    @Inject('IInvoiceRepository')
    private readonly invoiceRepository: IInvoiceRepository,
    @Inject('IDateUtils')
    protected readonly dateUtils: IDateUtils,
    protected readonly configService: ConfigService
  ) {
    super(dateUtils, configService);
  }

  public async generate(): Promise<string> {
    const [ prefix, nbItem ] = await Promise.all([
      this.configService.get<string>('ACCOUNTING_INVOICE_PREFIX'),
      this.invoiceRepository.countByYear(this.getCurrentYear())
    ]);

    return this.format(prefix, nbItem);
  }
}
