import {Injectable, Inject} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {IQuoteRepository} from './Repository/IQuoteRepository';
import {IDateUtils} from 'src/Application/IDateUtils';

@Injectable()
export class QuoteIdGenerator {
  constructor(
    @Inject('IQuoteRepository')
    private readonly quoteRepository: IQuoteRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private readonly configService: ConfigService
  ) {}

  public async generate(): Promise<string> {
    const year = this.dateUtils.getCurrentDate().getFullYear();
    const prefix = await this.configService.get<string>('BILLING_QUOTE_PREFIX');
    const pad = await this.configService.get<number>('BILLING_QUOTE_PAD');
    const nbItem = await this.quoteRepository.countByYear(year);

    return `${prefix}-${year}-${String(nbItem + 1).padStart(pad, '0')}`;
  }
}
