import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {CreateQuoteItemsCommand} from './CreateQuoteItemsCommand';
import {IQuoteItemRepository} from 'src/Domain/Billing/Repository/IQuoteItemRepository';
import {QuoteItem} from 'src/Domain/Billing/QuoteItem.entity';
import {IQuoteRepository} from 'src/Domain/Billing/Repository/IQuoteRepository';
import {Quote} from 'src/Domain/Billing/Quote.entity';
import {QuoteNotFoundException} from 'src/Domain/Billing/Exception/QuoteNotFoundException';

@CommandHandler(CreateQuoteItemsCommand)
export class CreateQuoteItemsCommandHandler {
  constructor(
    @Inject('IQuoteItemRepository')
    private readonly quoteItemRepository: IQuoteItemRepository,
    @Inject('IQuoteRepository')
    private readonly quoteRepository: IQuoteRepository
  ) {}

  public async execute(command: CreateQuoteItemsCommand): Promise<void> {
    const quote = await this.quoteRepository.find(command.quoteId);
    if (!(quote instanceof Quote)) {
      throw new QuoteNotFoundException();
    }

    for (const {title, quantity, dailyRate, vat} of command.items) {
      this.quoteItemRepository.save(
        new QuoteItem(
          title,
          quantity,
          Math.round(dailyRate * 100),
          Math.round(vat * 100),
          quote
        )
      );
    }
  }
}
