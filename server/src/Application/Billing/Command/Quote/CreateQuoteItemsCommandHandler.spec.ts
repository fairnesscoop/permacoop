import {mock, instance, when, verify, deepEqual, anything} from 'ts-mockito';
import {QuoteRepository} from 'src/Infrastructure/Billing/Repository/QuoteRepository';
import {CreateQuoteItemsCommandHandler} from './CreateQuoteItemsCommandHandler';
import {CreateQuoteItemsCommand, ICreateQuote} from './CreateQuoteItemsCommand';
import {Quote} from 'src/Domain/Billing/Quote.entity';
import {QuoteItemRepository} from 'src/Infrastructure/Billing/Repository/QuoteItemRepository';
import {QuoteItem} from 'src/Domain/Billing/QuoteItem.entity';
import {User} from 'src/Domain/User/User.entity';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {QuoteNotFoundException} from 'src/Domain/Billing/Exception/QuoteNotFoundException';

describe('CreateQuoteItemsCommandHandler', () => {
  let quoteRepository: QuoteRepository;
  let quoteItemRepository: QuoteItemRepository;
  let handler: CreateQuoteItemsCommandHandler;

  const quote = new Quote(
    'a491ccc9-df7c-4fc6-8e90-db816208f689',
    'draft',
    instance(mock(User)),
    instance(mock(Customer))
  );

  const items: ICreateQuote[] = [
    {
      title: 'Développement web',
      vat: 19.6,
      dailyRate: 800.5,
      quantity: 10
    },
    {
      title: 'Développement mobile',
      vat: 20,
      dailyRate: 700,
      quantity: 10
    }
  ];

  const command = new CreateQuoteItemsCommand(
    'a491ccc9-df7c-4fc6-8e90-db816208f689',
    items
  );

  beforeEach(() => {
    quoteRepository = mock(QuoteRepository);
    quoteItemRepository = mock(QuoteItemRepository);

    handler = new CreateQuoteItemsCommandHandler(
      instance(quoteItemRepository),
      instance(quoteRepository)
    );
  });

  it('testQuoteItemsSuccessfullyCreated', async () => {
    when(
      quoteRepository.find('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(quote);

    expect(await handler.execute(command)).toBeUndefined();

    verify(quoteRepository.find('a491ccc9-df7c-4fc6-8e90-db816208f689')).once();
    verify(
      quoteItemRepository.save(
        deepEqual(new QuoteItem('Développement web', 10, 80050, 1960, quote))
      )
    ).once();
    verify(
      quoteItemRepository.save(
        deepEqual(new QuoteItem('Développement mobile', 10, 70000, 2000, quote))
      )
    ).once();
  });

  it('testQuoteNotFound', async () => {
    when(
      quoteRepository.find('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(QuoteNotFoundException);
      expect(e.message).toBe('quote.errors.not_found');
      verify(quoteItemRepository.save(anything())).never();
    }
  });
});
