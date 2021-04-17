import { mock, instance, when, verify } from 'ts-mockito';
import { QuoteRepository } from 'src/Infrastructure/Accounting/Repository/QuoteRepository';
import { GetQuotesQueryHandler } from './GetQuotesQueryHandler';
import { ProjectView } from 'src/Application/Project/View/ProjectView';
import { CustomerView } from 'src/Application/Customer/View/CustomerView';
import { GetQuotesQuery } from './GetQuotesQuery';
import { Quote, QuoteStatus } from 'src/Domain/Accounting/Quote.entity';
import { Customer } from 'src/Domain/Customer/Customer.entity';
import { QuoteView } from '../../View/DailyRate/QuoteView';
import { Project } from 'src/Domain/Project/Project.entity';
import { QuoteItem } from 'src/Domain/Accounting/QuoteItem.entity';
import { Pagination } from 'src/Application/Common/Pagination';

describe('GetQuotesQueryHandler', () => {
  let quoteRepository: QuoteRepository;

  beforeEach(() => {
    quoteRepository = mock(QuoteRepository);
  });

  it('testGetQuotes', async () => {
    const date = new Date('2020-04-24');
    const date2 = new Date('2020-04-25');

    const customer = mock(Customer);
    when(customer.getId()).thenReturn('c6434c49-216b-41b3-a30a-79a3eb1198ec');
    when(customer.getName()).thenReturn('Radio France');

    const project = mock(Project);
    when(project.getId()).thenReturn('ade9021e-123c-4b9f-8be4-27a38164b789');
    when(project.getName()).thenReturn('Project');

    const quoteItem1 = mock(QuoteItem);
    when(quoteItem1.getQuantity()).thenReturn(200);
    when(quoteItem1.getDailyRate()).thenReturn(60000);

    const quoteItem2 = mock(QuoteItem);
    when(quoteItem2.getQuantity()).thenReturn(160);
    when(quoteItem2.getDailyRate()).thenReturn(6500);

    const quote1 = mock(Quote);
    when(quote1.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(quote1.getQuoteId()).thenReturn('FS-DEVIS-2020-0001');
    when(quote1.getStatus()).thenReturn(QuoteStatus.REFUSED);
    when(quote1.getCreatedAt()).thenReturn(date);
    when(quote1.getCustomer()).thenReturn(instance(customer));
    when(quote1.getProject()).thenReturn(instance(project));
    when(quote1.getItems()).thenReturn([instance(quoteItem1)]);

    const quote2 = mock(Quote);
    when(quote2.getId()).thenReturn('b3332cd1-5631-4b7b-a5d4-ba49910cb877');
    when(quote2.getQuoteId()).thenReturn('FS-DEVIS-2020-0002');
    when(quote2.getStatus()).thenReturn(QuoteStatus.ACCEPTED);
    when(quote2.getCreatedAt()).thenReturn(date2);
    when(quote2.getCustomer()).thenReturn(instance(customer));
    when(quote2.getProject()).thenReturn(instance(project));
    when(quote2.getItems()).thenReturn([instance(quoteItem2)]);

    when(quoteRepository.findQuotes(1)).thenResolve([
      [instance(quote1), instance(quote2)],
      2
    ]);

    const queryHandler = new GetQuotesQueryHandler(instance(quoteRepository));

    const expectedResult = new Pagination<QuoteView>(
      [
        new QuoteView(
          'd54f15d6-1a1d-47e8-8672-9f46018f9960',
          'FS-DEVIS-2020-0001',
          QuoteStatus.REFUSED,
          date,
          1440,
          new CustomerView(
            'c6434c49-216b-41b3-a30a-79a3eb1198ec',
            'Radio France'
          ),
          new ProjectView('ade9021e-123c-4b9f-8be4-27a38164b789', 'Project')
        ),
        new QuoteView(
          'b3332cd1-5631-4b7b-a5d4-ba49910cb877',
          'FS-DEVIS-2020-0002',
          QuoteStatus.ACCEPTED,
          date2,
          124.8,
          new CustomerView(
            'c6434c49-216b-41b3-a30a-79a3eb1198ec',
            'Radio France'
          ),
          new ProjectView('ade9021e-123c-4b9f-8be4-27a38164b789', 'Project')
        )
      ],
      2
    );

    expect(await queryHandler.execute(new GetQuotesQuery(1))).toMatchObject(
      expectedResult
    );

    verify(quoteRepository.findQuotes(1)).once();
  });
});
