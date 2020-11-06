import {mock, instance, when, verify, anything} from 'ts-mockito';
import {CustomerRepository} from 'src/Infrastructure/Customer/Repository/CustomerRepository';
import {IsCustomerAlreadyExist} from 'src/Domain/Customer/Specification/IsCustomerAlreadyExist';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {UpdateCustomerCommand} from './UpdateCustomerCommand';
import {CustomerNotFoundException} from 'src/Domain/Customer/Exception/CustomerNotFoundException';
import {CustomerAlreadyExistException} from 'src/Domain/Customer/Exception/CustomerAlreadyExistException';
import {UpdateCustomerCommandHandler} from './UpdateCustomerCommandHandler';
import {AddressRepository} from 'src/Infrastructure/Customer/Repository/AddressRepository';
import {Address} from 'src/Domain/Customer/Address.entity';

describe('UpdateCustomerCommandHandler', () => {
  let customerRepository: CustomerRepository;
  let addressRepository: AddressRepository;
  let isCustomerAlreadyExist: IsCustomerAlreadyExist;
  let updatedCustomer: Customer;
  let updatedAddress: Address;
  let handler: UpdateCustomerCommandHandler;

  const command = new UpdateCustomerCommand(
    'afda00b1-bf49-4102-9bc2-bce17f3acd48',
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
    updatedCustomer = mock(Customer);
    updatedAddress = mock(Address);

    handler = new UpdateCustomerCommandHandler(
      instance(customerRepository),
      instance(addressRepository),
      instance(isCustomerAlreadyExist)
    );
  });

  it('testUpdateSuccessfully', async () => {
    when(
      customerRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
    ).thenResolve(instance(updatedCustomer));

    when(updatedCustomer.getAddress()).thenReturn(instance(updatedAddress));
    when(updatedCustomer.getName()).thenReturn('Old customer');
    when(isCustomerAlreadyExist.isSatisfiedBy('Customer')).thenResolve(false);

    // Command return nothing
    expect(await handler.execute(command)).toBeUndefined();

    verify(isCustomerAlreadyExist.isSatisfiedBy('Customer')).once();
    verify(customerRepository.save(instance(updatedCustomer))).once();
    verify(addressRepository.save(instance(updatedAddress))).once();
    verify(updatedCustomer.getAddress()).once();
    verify(updatedAddress.update('2 rue Dieu', 'Paris', '75010', 'FR')).once();
    verify(updatedCustomer.updateName('Customer')).once();
    verify(
      updatedAddress.update('2 rue Dieu', 'Paris', '75010', 'FR')
    ).calledBefore(addressRepository.save(instance(updatedAddress)));
    verify(updatedCustomer.updateName('Customer')).calledBefore(
      customerRepository.save(instance(updatedCustomer))
    );
    verify(updatedCustomer.getName()).once();
  });

  it('testCustomerNotFound', async () => {
    when(
      customerRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomerNotFoundException);
      expect(e.message).toBe('crm.customers.errors.not_found');
      verify(isCustomerAlreadyExist.isSatisfiedBy(anything())).never();
      verify(addressRepository.save(anything())).never();
      verify(
        updatedAddress.update(anything(), anything(), anything(), anything())
      ).never();
      verify(customerRepository.save(anything())).never();
      verify(updatedCustomer.updateName(anything())).never();
      verify(updatedCustomer.getName()).never();
    }
  });

  it('testCustomerAlreadyExist', async () => {
    when(
      customerRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
    ).thenResolve(instance(updatedCustomer));
    when(isCustomerAlreadyExist.isSatisfiedBy('Customer')).thenResolve(true);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomerAlreadyExistException);
      expect(e.message).toBe('crm.customers.errors.already_exist');
      verify(isCustomerAlreadyExist.isSatisfiedBy('Customer')).once();
      verify(customerRepository.save(anything())).never();
      verify(updatedCustomer.updateName(anything())).never();
      verify(addressRepository.save(anything())).never();
      verify(
        updatedAddress.update(anything(), anything(), anything(), anything())
      ).never();
      verify(updatedCustomer.getName()).once();
    }
  });
});
