import {mock, instance, when, verify, deepEqual} from 'ts-mockito';
import {CustomerRepository} from 'src/Infrastructure/Customer/Repository/CustomerRepository';
import {IsCustomerAlreadyExist} from 'src/Domain/Customer/Specification/IsCustomerAlreadyExist';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {CreateCustomerCommandHandler} from 'src/Application/Customer/Command/CreateCustomerCommandHandler';
import {CreateCustomerCommand} from 'src/Application/Customer/Command/CreateCustomerCommand';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';
import {CustomerAlreadyExistException} from 'src/Domain/Customer/Exception/CustomerAlreadyExistException';

describe('CreateCustomerCommandHandler', () => {
  let customerRepository: CustomerRepository;
  let isCustomerAlreadyExist: IsCustomerAlreadyExist;
  let createdCustomer: Customer;
  let handler: CreateCustomerCommandHandler;

  const command = new CreateCustomerCommand();
  command.name = 'Radio France';

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
    when(isCustomerAlreadyExist.isSatisfiedBy('Radio France')).thenResolve(
      false
    );
    when(createdCustomer.getId()).thenReturn(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );
    when(createdCustomer.getName()).thenReturn('Radio France');
    when(
      customerRepository.save(deepEqual(new Customer('Radio France')))
    ).thenResolve(instance(createdCustomer));

    expect(await handler.execute(command)).toMatchObject(
      new CustomerView('2d5fb4da-12c2-11ea-8d71-362b9e155667', 'Radio France')
    );

    verify(isCustomerAlreadyExist.isSatisfiedBy('Radio France')).once();
    verify(
      customerRepository.save(deepEqual(new Customer('Radio France')))
    ).once();
    verify(createdCustomer.getId()).once();
    verify(createdCustomer.getName()).once();
  });

  it('testCustomerAlreadyExist', async () => {
    when(isCustomerAlreadyExist.isSatisfiedBy('Radio France')).thenResolve(
      true
    );

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomerAlreadyExistException);
      expect(e.message).toBe('customer.errors.already_exist');
      verify(isCustomerAlreadyExist.isSatisfiedBy('Radio France')).once();
      verify(
        customerRepository.save(deepEqual(new Customer('Radio France')))
      ).never();
      verify(createdCustomer.getId()).never();
      verify(createdCustomer.getName()).never();
    }
  });
});
