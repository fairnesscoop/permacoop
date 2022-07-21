import { mock, instance, when, verify, anything, deepEqual } from 'ts-mockito';
import { ProjectRepository } from 'src/Infrastructure/Project/Repository/ProjectRepository';
import { GenerateInvoiceCommandHandler } from './GenerateInvoiceCommandHandler';
import { GenerateInvoiceCommand } from './GenerateInvoiceCommand';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { ProjectNotFoundException } from 'src/Domain/Project/Exception/ProjectNotFoundException';
import { InvoiceIdGenerator } from 'src/Domain/Accounting/Generators/InvoiceIdGenerator';
import { Invoice, InvoiceStatus } from 'src/Domain/Accounting/Invoice.entity';
import { EventRepository } from 'src/Infrastructure/FairCalendar/Repository/EventRepository';
import { InvoiceRepository } from 'src/Infrastructure/Accounting/Repository/InvoiceRepository';
import { InvoiceItemRepository } from 'src/Infrastructure/Accounting/Repository/InvoiceItemRepository';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import { Project } from 'src/Domain/Project/Project.entity';
import { NoBillableEventsFoundException } from 'src/Domain/Accounting/Exception/NoBillableEventsFoundException';
import { InvoiceItem } from 'src/Domain/Accounting/InvoiceItem.entity';
import { CooperativeRepository } from 'src/Infrastructure/Settings/Repository/CooperativeRepository';
import { CooperativeNotFoundException } from 'src/Domain/Settings/Repository/CooperativeNotFoundException';
import { Cooperative } from 'src/Domain/Settings/Cooperative.entity';

describe('GenerateInvoiceCommandHandler', () => {
  let projectRepository: ProjectRepository;
  let cooperativeRepository: CooperativeRepository;
  let eventRepository: EventRepository;
  let invoiceRepository: InvoiceRepository;
  let invoiceItemRepository: InvoiceItemRepository;
  let invoiceIdGenerator: InvoiceIdGenerator;
  let dateUtilsAdapter: DateUtilsAdapter;
  let handler: GenerateInvoiceCommandHandler;

  const user = mock(User);
  const project = mock(Project);
  const date = new Date('2020-11-23T17:43:14.299Z');
  const expiryDate = new Date('2020-11-28T17:43:14.299Z');
  const cooperative = mock(Cooperative);
  const command = new GenerateInvoiceCommand(
    'a491ccc9-df7c-4fc6-8e90-db816208f689',
    InvoiceStatus.DRAFT,
    5,
    instance(user)
  );

  beforeEach(() => {
    projectRepository = mock(ProjectRepository);
    cooperativeRepository = mock(CooperativeRepository);
    invoiceIdGenerator = mock(InvoiceIdGenerator);
    eventRepository = mock(EventRepository);
    invoiceRepository = mock(InvoiceRepository);
    invoiceItemRepository = mock(InvoiceItemRepository);
    dateUtilsAdapter = mock(DateUtilsAdapter);

    handler = new GenerateInvoiceCommandHandler(
      instance(projectRepository),
      instance(cooperativeRepository),
      instance(eventRepository),
      instance(invoiceRepository),
      instance(invoiceItemRepository),
      instance(dateUtilsAdapter),
      instance(invoiceIdGenerator)
    );
  });

  it('testCooperativeNotFound', async () => {
    when(cooperativeRepository.find()).thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(CooperativeNotFoundException);
      expect(e.message).toBe('settings.errors.cooperative_not_found');
      verify(cooperativeRepository.find()).once();
      verify(projectRepository.findOneById(anything())).never();
      verify(invoiceIdGenerator.generate()).never();
      verify(
        eventRepository.findBillableEventsByMonthAndProject(
          anything(),
          anything()
        )
      ).never();
      verify(dateUtilsAdapter.addDaysToDate(anything(), anything())).never();
      verify(invoiceRepository.save(anything())).never();
      verify(invoiceItemRepository.save(anything())).never();
      verify(dateUtilsAdapter.getCurrentDate()).never();
    }
  });

  it('testProjectNotFound', async () => {
    when(cooperativeRepository.find()).thenResolve(instance(cooperative));
    when(
      projectRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(ProjectNotFoundException);
      expect(e.message).toBe('crm.projects.errors.not_found');
      verify(cooperativeRepository.find()).once();
      verify(
        projectRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
      ).once();
      verify(invoiceIdGenerator.generate()).never();
      verify(
        eventRepository.findBillableEventsByMonthAndProject(
          anything(),
          anything()
        )
      ).never();
      verify(dateUtilsAdapter.addDaysToDate(anything(), anything())).never();
      verify(invoiceRepository.save(anything())).never();
      verify(invoiceItemRepository.save(anything())).never();
      verify(dateUtilsAdapter.getCurrentDate()).never();
    }
  });

  it('testNoBillableEventsFound', async () => {
    when(cooperativeRepository.find()).thenResolve(instance(cooperative));
    when(
      projectRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(instance(project));
    when(dateUtilsAdapter.getCurrentDate()).thenReturn(date);
    when(invoiceIdGenerator.generate()).thenResolve('FS-2020-0001');
    when(
      eventRepository.findBillableEventsByMonthAndProject(
        date,
        instance(project)
      )
    ).thenResolve([]);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(NoBillableEventsFoundException);
      expect(e.message).toBe(
        'accounting.invoices.errors.no_billable_events_found'
      );
      verify(cooperativeRepository.find()).once();
      verify(
        projectRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
      ).once();
      verify(invoiceIdGenerator.generate()).once();
      verify(
        eventRepository.findBillableEventsByMonthAndProject(
          date,
          instance(project)
        )
      ).once();
      verify(dateUtilsAdapter.addDaysToDate(anything(), anything())).never();
      verify(dateUtilsAdapter.getCurrentDate()).once();
      verify(invoiceRepository.save(anything())).never();
      verify(invoiceItemRepository.save(anything())).never();
    }
  });

  it('testGenerateInvoice', async () => {
    const events = [
      {
        time_spent: '180',
        billable: false,
        task_name: 'Développement',
        first_name: 'Mathieu',
        last_name: 'MARCHOIS',
        daily_rate: 60000
      },
      {
        time_spent: '420',
        billable: true,
        task_name: 'Architecture',
        first_name: 'Mathieu',
        last_name: 'MARCHOIS',
        daily_rate: null
      },
      {
        time_spent: '4200',
        billable: true,
        task_name: 'Développement',
        first_name: 'Mathieu',
        last_name: 'MARCHOIS',
        daily_rate: 60000
      }
    ];

    const invoice = new Invoice(
      'FS-2020-0001',
      InvoiceStatus.DRAFT,
      '2020-11-28T17:43:14.299Z',
      instance(user),
      instance(project)
    );

    const savedInvoice = mock(Invoice);
    when(savedInvoice.getId()).thenReturn(
      'fc8a4cd9-31eb-4fca-814d-b30c05de485d'
    );

    const invoiceItems = [
      new InvoiceItem(
        invoice,
        'Développement - Mathieu MARCHOIS',
        43,
        60000,
        10000
      ),
      new InvoiceItem(invoice, 'Architecture - Mathieu MARCHOIS', 100, 0, 0),
      new InvoiceItem(
        invoice,
        'Développement - Mathieu MARCHOIS',
        1000,
        60000,
        0
      )
    ];

    when(cooperativeRepository.find()).thenResolve(instance(cooperative));
    when(cooperative.getDayDuration()).thenReturn(420);
    when(
      projectRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(instance(project));
    when(dateUtilsAdapter.getCurrentDate()).thenReturn(date);
    when(invoiceIdGenerator.generate()).thenResolve('FS-2020-0001');
    when(
      eventRepository.findBillableEventsByMonthAndProject(
        date,
        instance(project)
      )
    ).thenResolve(events);
    when(dateUtilsAdapter.addDaysToDate(date, 5)).thenReturn(expiryDate);
    when(invoiceRepository.save(deepEqual(invoice))).thenResolve(
      instance(savedInvoice)
    );

    expect(await handler.execute(command)).toBe(
      'fc8a4cd9-31eb-4fca-814d-b30c05de485d'
    );

    verify(cooperativeRepository.find()).once();
    verify(
      projectRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).once();
    verify(invoiceIdGenerator.generate()).once();
    verify(
      eventRepository.findBillableEventsByMonthAndProject(
        date,
        instance(project)
      )
    ).once();
    verify(dateUtilsAdapter.addDaysToDate(date, 5)).once();
    verify(dateUtilsAdapter.getCurrentDate()).once();
    verify(invoiceRepository.save(deepEqual(invoice))).once();
    verify(invoiceItemRepository.save(deepEqual(invoiceItems))).once();
  });
});
