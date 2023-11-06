import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { CustomerRepository } from 'src/Infrastructure/Customer/Repository/CustomerRepository';
import { IsCustomerAlreadyExist } from 'src/Domain/Customer/Specification/IsCustomerAlreadyExist';
import { Customer } from 'src/Domain/Customer/Customer.entity';
import { CreateCustomerCommandHandler } from 'src/Application/Customer/Command/CreateCustomerCommandHandler';
import { CreateCustomerCommand } from 'src/Application/Customer/Command/CreateCustomerCommand';
import { CustomerAlreadyExistException } from 'src/Domain/Customer/Exception/CustomerAlreadyExistException';

describe('CreateCustomerCommandHandler', () => {
  let customerRepository: CustomerRepository;
  let isCustomerAlreadyExist: IsCustomerAlreadyExist;
  let createdCustomer: Customer;
  let handler: CreateCustomerCommandHandler;

  const command = new CreateCustomerCommand('Customer');

  beforeEach(() => {
    customerRepository = mock(CustomerRepository);
    isCustomerAlreadyExist = mock(IsCustomerAlreadyExist);
    createdCustomer = mock(Customer);

    handler = new CreateCustomerCommandHandler(
      instance(customerRepository),
      instance(isCustomerAlreadyExist)
    );
  });

  it('testCustomerCreatedSuccessfully', async () => {
    when(isCustomerAlreadyExist.isSatisfiedBy('Customer')).thenResolve(false);
    when(createdCustomer.getId()).thenReturn(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );
    when(createdCustomer.getName()).thenReturn('Customer');
    when(
      customerRepository.save(deepEqual(new Customer('Customer')))
    ).thenResolve(instance(createdCustomer));

    expect(await handler.execute(command)).toBe(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );

    verify(isCustomerAlreadyExist.isSatisfiedBy('Customer')).once();
    verify(customerRepository.save(deepEqual(new Customer('Customer')))).once();
    verify(createdCustomer.getId()).once();
  });

  it('testCustomerAlreadyExist', async () => {
    when(isCustomerAlreadyExist.isSatisfiedBy('Customer')).thenResolve(true);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomerAlreadyExistException);
      expect(e.message).toBe('crm.customers.errors.already_exist');
      verify(isCustomerAlreadyExist.isSatisfiedBy('Customer')).once();
      verify(customerRepository.save(anything())).never();
      verify(createdCustomer.getId()).never();
    }
  });
});
