import {Quote} from '../Quote.entity';

export interface IQuoteRepository {
  save(quote: Quote): Promise<Quote>;
  find(id: string): Promise<Quote>;
  findAll(): Promise<Quote[]>;
  countByYear(year: number): Promise<number>;
}
