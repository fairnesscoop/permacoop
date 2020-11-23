import { mock, instance, when, verify } from 'ts-mockito';
import { InvoiceRepository } from 'src/Infrastructure/Accounting/Repository/InvoiceRepository';
import { GetInvoicesQueryHandler } from './GetInvoicesQueryHandler';
import { CustomerView } from 'src/Application/Customer/View/CustomerView';
import { GetInvoicesQuery } from './GetInvoicesQuery';
import { Invoice, InvoiceStatus } from 'src/Domain/Accounting/Invoice.entity';
import { Customer } from 'src/Domain/Customer/Customer.entity';
import { Pagination } from 'src/Application/Common/Pagination';
import { Project } from 'src/Domain/Project/Project.entity';
import { InvoiceView } from '../../View/DailyRate/InvoiceView';
import { ProjectView } from 'src/Application/Project/View/ProjectView';

describe('GetInvoicesQueryHandler', () => {
  let invoiceRepository: InvoiceRepository;

  beforeEach(() => {
    invoiceRepository = mock(InvoiceRepository);
  });

  it('testGetInvoices', async () => {
    const customer = mock(Customer);
    when(customer.getId()).thenReturn('c6434c49-216b-41b3-a30a-79a3eb1198ec');
    when(customer.getName()).thenReturn('Radio France');

    const project = mock(Project);
    when(project.getId()).thenReturn('deffa668-b9af-4a52-94dd-61a35401b917');
    when(project.getName()).thenReturn('Plateforme web');
    when(project.getCustomer()).thenReturn(instance(customer));

    const invoice1 = mock(Invoice);
    when(invoice1.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(invoice1.getInvoiceId()).thenReturn('FS-2020-0001');
    when(invoice1.getStatus()).thenReturn(InvoiceStatus.DRAFT);
    when(invoice1.getCreatedAt()).thenReturn('2020-11-25T17:43:14.299Z');
    when(invoice1.getExpiryDate()).thenReturn('2020-12-25T17:43:14.299Z');
    when(invoice1.getProject()).thenReturn(instance(project));

    const invoice2 = mock(Invoice);
    when(invoice2.getId()).thenReturn('b3332cd1-5631-4b7b-a5d4-ba49910cb877');
    when(invoice2.getInvoiceId()).thenReturn('FS-2020-0002');
    when(invoice2.getCreatedAt()).thenReturn('2020-11-25T17:43:14.299Z');
    when(invoice2.getExpiryDate()).thenReturn('2020-12-25T17:43:14.299Z');
    when(invoice2.getStatus()).thenReturn(InvoiceStatus.PAYED);
    when(invoice2.getProject()).thenReturn(instance(project));

    when(invoiceRepository.findInvoices(1)).thenResolve([
      [instance(invoice1), instance(invoice2)],
      2
    ]);

    const queryHandler = new GetInvoicesQueryHandler(
      instance(invoiceRepository)
    );

    const expectedResult = new Pagination<InvoiceView>(
      [
        new InvoiceView(
          'd54f15d6-1a1d-47e8-8672-9f46018f9960',
          'FS-2020-0001',
          InvoiceStatus.DRAFT,
          '2020-11-25T17:43:14.299Z',
          '2020-12-25T17:43:14.299Z',
          0,
          new ProjectView(
            'deffa668-b9af-4a52-94dd-61a35401b917',
            'Plateforme web',
            null,
            null,
            new CustomerView(
              'c6434c49-216b-41b3-a30a-79a3eb1198ec',
              'Radio France'
            )
          )
        ),
        new InvoiceView(
          'b3332cd1-5631-4b7b-a5d4-ba49910cb877',
          'FS-2020-0002',
          InvoiceStatus.PAYED,
          '2020-11-25T17:43:14.299Z',
          '2020-12-25T17:43:14.299Z',
          0,
          new ProjectView(
            'deffa668-b9af-4a52-94dd-61a35401b917',
            'Plateforme web',
            null,
            null,
            new CustomerView(
              'c6434c49-216b-41b3-a30a-79a3eb1198ec',
              'Radio France'
            )
          )
        )
      ],
      2
    );

    expect(await queryHandler.execute(new GetInvoicesQuery(1))).toMatchObject(
      expectedResult
    );

    verify(invoiceRepository.findInvoices(1)).once();
  });
});
