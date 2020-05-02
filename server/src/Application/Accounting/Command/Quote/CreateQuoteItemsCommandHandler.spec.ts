import {mock, instance, when, verify, deepEqual, anything} from 'ts-mockito';
import {QuoteRepository} from 'src/Infrastructure/Accounting/Repository/QuoteRepository';
import {CreateQuoteItemsCommandHandler} from './CreateQuoteItemsCommandHandler';
import {CreateQuoteItemsCommand, ICreateQuote} from './CreateQuoteItemsCommand';
import {Quote, QuoteStatus} from 'src/Domain/Accounting/Quote.entity';
import {QuoteItemRepository} from 'src/Infrastructure/Accounting/Repository/QuoteItemRepository';
import {QuoteItem} from 'src/Domain/Accounting/QuoteItem.entity';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {QuoteNotFoundException} from 'src/Domain/Accounting/Exception/QuoteNotFoundException';

describe('CreateQuoteItemsCommandHandler', () => {
  let quoteRepository: QuoteRepository;
  let quoteItemRepository: QuoteItemRepository;
  let handler: CreateQuoteItemsCommandHandler;

  const quote = new Quote(
    'a491ccc9-df7c-4fc6-8e90-db816208f689',
    QuoteStatus.DRAFT,
    instance(mock(User)),
    instance(mock(Customer))
  );

  const items: ICreateQuote[] = [
    {
      title: 'Développement web',
      dailyRate: 800.5,
      quantity: 10
    },
    {
      title: 'Développement mobile',
      dailyRate: 700,
      quantity: 1.5
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
        deepEqual(new QuoteItem('Développement web', 1000, 80050, quote))
      )
    ).once();
    verify(
      quoteItemRepository.save(
        deepEqual(new QuoteItem('Développement mobile', 150, 70000, quote))
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
