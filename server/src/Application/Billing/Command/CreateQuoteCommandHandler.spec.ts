import {mock, instance, when, verify, deepEqual, anything} from 'ts-mockito';
import {CustomerRepository} from 'src/Infrastructure/Customer/Repository/CustomerRepository';
import {QuoteRepository} from 'src/Infrastructure/Billing/Repository/QuoteRepository';
import {CreateQuoteCommandHandler} from './CreateQuoteCommandHandler';
import {ProjectRepository} from 'src/Infrastructure/Project/Repository/ProjectRepository';
import {QuoteIdGenerator} from 'src/Domain/Billing/QuoteIdGenerator';
import {CreateQuoteCommand} from './CreateQuoteCommand';
import {User} from 'src/Domain/User/User.entity';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {Project} from 'src/Domain/Project/Project.entity';
import {Quote} from 'src/Domain/Billing/Quote.entity';
import {CustomerNotFoundException} from 'src/Domain/Customer/Exception/CustomerNotFoundException';
import {InvalidProjectException} from 'src/Domain/Billing/Exception/InvalidProjectException';

describe('CreateQuoteCommandHandler', () => {
  let quoteRepository: QuoteRepository;
  let customerRepository: CustomerRepository;
  let projectRepository: ProjectRepository;
  let quoteIdGenerator: QuoteIdGenerator;
  let handler: CreateQuoteCommandHandler;

  const user = mock(User);
  const quote = mock(Quote);
  const customer = new Customer('Customer');
  const project = new Project('Project', customer);
  const command = new CreateQuoteCommand(
    instance(user),
    'draft',
    'a491ccc9-df7c-4fc6-8e90-db816208f689',
    '3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c'
  );

  beforeEach(() => {
    quoteRepository = mock(QuoteRepository);
    customerRepository = mock(CustomerRepository);
    projectRepository = mock(ProjectRepository);
    quoteIdGenerator = mock(QuoteIdGenerator);

    handler = new CreateQuoteCommandHandler(
      instance(quoteRepository),
      instance(customerRepository),
      instance(projectRepository),
      instance(quoteIdGenerator)
    );
  });

  it('testQuoteSuccessfullyCreated', async () => {
    when(
      customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(customer);
    when(
      projectRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).thenResolve(project);
    when(quoteIdGenerator.generate()).thenResolve('FS-DEVIS-2020-0001');
    when(quote.getId()).thenReturn('7c35d37c-b0e3-480d-bf6c-3dc1e094886f');
    when(
      quoteRepository.save(
        deepEqual(
          new Quote(
            'FS-DEVIS-2020-0001',
            'draft',
            instance(user),
            customer,
            project
          )
        )
      )
    ).thenResolve(instance(quote));

    expect(await handler.execute(command)).toBe(
      '7c35d37c-b0e3-480d-bf6c-3dc1e094886f'
    );

    verify(
      customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).once();
    verify(
      projectRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).once();
    verify(quoteIdGenerator.generate()).once();
    verify(
      quoteRepository.save(
        deepEqual(
          new Quote(
            'FS-DEVIS-2020-0001',
            'draft',
            instance(user),
            customer,
            project
          )
        )
      )
    ).once();
  });

  it('testQuoteSuccessfullyWithoutProjectCreated', async () => {
    when(
      customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(customer);
    when(quoteIdGenerator.generate()).thenResolve('FS-DEVIS-2020-0001');
    when(quote.getId()).thenReturn('7c35d37c-b0e3-480d-bf6c-3dc1e094886f');
    when(
      quoteRepository.save(
        deepEqual(
          new Quote(
            'FS-DEVIS-2020-0001',
            'draft',
            instance(user),
            customer,
            null
          )
        )
      )
    ).thenResolve(instance(quote));

    expect(
      await handler.execute(
        new CreateQuoteCommand(
          instance(user),
          'draft',
          'a491ccc9-df7c-4fc6-8e90-db816208f689'
        )
      )
    ).toBe('7c35d37c-b0e3-480d-bf6c-3dc1e094886f');

    verify(
      customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).once();
    verify(projectRepository.findOneById(anything())).never();
    verify(quoteIdGenerator.generate()).once();
    verify(
      quoteRepository.save(
        deepEqual(
          new Quote(
            'FS-DEVIS-2020-0001',
            'draft',
            instance(user),
            customer,
            null
          )
        )
      )
    ).once();
  });

  it('testCustomerNotFound', async () => {
    when(
      customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(null);

    try {
      expect(await handler.execute(command)).toBe(
        '7c35d37c-b0e3-480d-bf6c-3dc1e094886f'
      );
    } catch (e) {
      expect(e).toBeInstanceOf(CustomerNotFoundException);
      expect(e.message).toBe('customer.errors.not_found');
      verify(
        customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
      ).once();
      verify(projectRepository.findOneById(anything())).never();
      verify(quoteIdGenerator.generate()).never();
      verify(quoteRepository.save(anything())).never();
    }
  });

  it('testProjectNotFound', async () => {
    when(
      customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(customer);
    when(
      projectRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).thenResolve(null);

    try {
      expect(await handler.execute(command)).toBe(
        '7c35d37c-b0e3-480d-bf6c-3dc1e094886f'
      );
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidProjectException);
      expect(e.message).toBe('quote.errors.invalid_project');
      verify(
        customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
      ).once();
      verify(projectRepository.findOneById(anything())).once();
      verify(quoteIdGenerator.generate()).never();
      verify(quoteRepository.save(anything())).never();
    }
  });

  it('testProjectNotAllowed', async () => {
    const customer2 = mock(Customer);
    const project2 = mock(Project);

    when(customer2.getId()).thenReturn('6c35d37c-b0e3-480d-bf6c-3dc1e094886f');
    when(project2.getCustomer()).thenReturn(instance(customer2));
    when(
      customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(customer);
    when(
      projectRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).thenResolve(instance(project2));

    try {
      expect(await handler.execute(command)).toBe(
        '7c35d37c-b0e3-480d-bf6c-3dc1e094886f'
      );
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidProjectException);
      expect(e.message).toBe('quote.errors.invalid_project');
      verify(
        customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
      ).once();
      verify(projectRepository.findOneById(anything())).once();
      verify(quoteIdGenerator.generate()).never();
      verify(quoteRepository.save(anything())).never();
    }
  });
});
