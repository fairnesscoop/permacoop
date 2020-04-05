import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {QuoteItem} from 'src/Domain/Billing/QuoteItem.entity';
import {IQuoteItemRepository} from 'src/Domain/Billing/Repository/IQuoteItemRepository';

export class QuoteItemRepository implements IQuoteItemRepository {
  constructor(
    @InjectRepository(QuoteItem)
    private readonly repository: Repository<QuoteItem>
  ) {}

  public save(quoteItem: QuoteItem): Promise<QuoteItem> {
    return this.repository.save(quoteItem);
  }
}
