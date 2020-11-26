import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IQuoteRepository } from '../Repository/IQuoteRepository';
import { IDateUtils } from 'src/Application/IDateUtils';
import { AbstractGenerator } from './AbstractGenerator';

@Injectable()
export class QuoteIdGenerator extends AbstractGenerator {
  constructor(
    @Inject('IQuoteRepository')
    private readonly quoteRepository: IQuoteRepository,
    @Inject('IDateUtils')
    protected readonly dateUtils: IDateUtils,
    protected readonly configService: ConfigService
  ) {
    super(dateUtils, configService);
  }

  public async generate(): Promise<string> {
    const [ prefix, nbItem ] = await Promise.all([
      this.configService.get<string>('ACCOUNTING_QUOTE_PREFIX'),
      this.quoteRepository.countByYear(this.getCurrentYear())
    ]);

    return this.format(prefix, nbItem);
  }
}
