import {mock, instance, when, verify, deepEqual, anything} from 'ts-mockito';
import {CustomerRepository} from 'src/Infrastructure/Customer/Repository/CustomerRepository';
import {IsCustomerAlreadyExist} from 'src/Domain/Customer/Specification/IsCustomerAlreadyExist';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {CreateCustomerCommandHandler} from 'src/Application/Customer/Command/CreateCustomerCommandHandler';
import {CreateCustomerCommand} from 'src/Application/Customer/Command/CreateCustomerCommand';
import {CustomerAlreadyExistException} from 'src/Domain/Customer/Exception/CustomerAlreadyExistException';
import {AddressRepository} from 'src/Infrastructure/Customer/Repository/AddressRepository';
import {Address} from 'src/Domain/Customer/Address.entity';

describe('CreateCustomerCommandHandler', () => {
  let customerRepository: CustomerRepository;
  let addressRepository: AddressRepository;
  let isCustomerAlreadyExist: IsCustomerAlreadyExist;
  let createdCustomer: Customer;
  let createdAddress: Address;
  let handler: CreateCustomerCommandHandler;

  const command = new CreateCustomerCommand(
    'Customer',
    '2 rue Dieu',
    'Paris',
    '75010',
    'FR'
  );

  beforeEach(() => {
    customerRepository = mock(CustomerRepository);
    addressRepository = mock(AddressRepository);
    isCustomerAlreadyExist = mock(IsCustomerAlreadyExist);
    createdCustomer = mock(Customer);
    createdAddress = mock(Address);

    handler = new CreateCustomerCommandHandler(
      instance(customerRepository),
      instance(addressRepository),
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
      addressRepository.save(
        deepEqual(new Address('2 rue Dieu', 'Paris', '75010', 'FR'))
      )
    ).thenResolve(instance(createdAddress));
    when(
      customerRepository.save(
        deepEqual(new Customer('Customer', instance(createdAddress)))
      )
    ).thenResolve(instance(createdCustomer));

    expect(await handler.execute(command)).toBe(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );

    verify(isCustomerAlreadyExist.isSatisfiedBy('Customer')).once();
    verify(
      customerRepository.save(
        deepEqual(new Customer('Customer', instance(createdAddress)))
      )
    ).once();
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
