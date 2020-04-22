import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {QuoteItem} from 'src/Domain/Accounting/QuoteItem.entity';
import {IQuoteItemRepository} from 'src/Domain/Accounting/Repository/IQuoteItemRepository';

export class QuoteItemRepository implements IQuoteItemRepository {
  constructor(
    @InjectRepository(QuoteItem)
    private readonly repository: Repository<QuoteItem>
  ) {}

  public save(quoteItem: QuoteItem): Promise<QuoteItem> {
    return this.repository.save(quoteItem);
  }
}
