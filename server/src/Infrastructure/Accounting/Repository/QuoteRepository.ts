import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {IQuoteRepository} from 'src/Domain/Accounting/Repository/IQuoteRepository';
import {Quote} from 'src/Domain/Accounting/Quote.entity';

export class QuoteRepository implements IQuoteRepository {
  constructor(
    @InjectRepository(Quote)
    private readonly repository: Repository<Quote>
  ) {}

  public save(quote: Quote): Promise<Quote> {
    return this.repository.save(quote);
  }

  public countByYear(year: number): Promise<number> {
    return this.repository
      .createQueryBuilder('quote')
      .select('quote.id')
      .where('extract(year FROM quote.createdAt) = :year', {year})
      .getCount();
  }

  public find(id: string): Promise<Quote> {
    return this.repository
      .createQueryBuilder('quote')
      .select('quote.id')
      .where('quote.id = :id', {id})
      .getOne();
  }
}
