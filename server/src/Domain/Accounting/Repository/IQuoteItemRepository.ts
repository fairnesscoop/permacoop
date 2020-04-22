import {QuoteItem} from '../QuoteItem.entity';

export interface IQuoteItemRepository {
  save(quoteItem: QuoteItem): Promise<QuoteItem>;
}
