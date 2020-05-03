import {QueryHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {GetQuotesQuery} from './GetQuotesQuery';
import {IQuoteRepository} from 'src/Domain/Accounting/Repository/IQuoteRepository';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';
import {QuoteView} from '../../View/DailyRate/QuoteView';
import {ProjectView} from 'src/Application/Project/View/ProjectView';

@QueryHandler(GetQuotesQuery)
export class GetQuotesQueryHandler {
  constructor(
    @Inject('IQuoteRepository')
    private readonly quoteRepository: IQuoteRepository
  ) {}

  public async execute(query: GetQuotesQuery): Promise<QuoteView[]> {
    const quotes = await this.quoteRepository.findAll();
    const results: QuoteView[] = [];

    for (const quote of quotes) {
      const project = quote.getProject();
      const customer = quote.getCustomer();
      let amountExcludingVat = 0;

      for (const item of quote.getItems()) {
        const dailyRate = item.getDailyRate() / 100;
        const quantity = item.getQuantity() / 100;

        amountExcludingVat += dailyRate * quantity;
      }

      results.push(
        new QuoteView(
          quote.getId(),
          quote.getQuoteId(),
          quote.getStatus(),
          quote.getCreatedAt(),
          amountExcludingVat * 1.2,
          new CustomerView(customer.getId(), customer.getName()),
          project ? new ProjectView(project.getId(), project.getName()) : null
        )
      );
    }

    return results;
  }
}
