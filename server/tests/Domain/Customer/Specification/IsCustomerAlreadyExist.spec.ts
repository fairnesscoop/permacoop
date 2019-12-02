import {mock, instance, when, verify} from 'ts-mockito';
import {CustomerRepository} from 'src/Infrastructure/Customer/Repository/CustomerRepository';
import {IsCustomerAlreadyExist} from 'src/Domain/Customer/Specification/IsCustomerAlreadyExist';
import {Customer} from 'src/Domain/Customer/Customer.entity';

describe('IsCustomerAlreadyExist', () => {
  let customerRepository: CustomerRepository;
  let isCustomerAlreadyExist: IsCustomerAlreadyExist;

  beforeEach(() => {
    customerRepository = mock(CustomerRepository);
    isCustomerAlreadyExist = new IsCustomerAlreadyExist(
      instance(customerRepository)
    );
  });

  it('testCustomerAlreadyExist', async () => {
    when(customerRepository.findOneByName('Customer')).thenResolve(
      new Customer('Customer')
    );
    expect(await isCustomerAlreadyExist.isSatisfiedBy('Customer')).toBe(true);
    verify(customerRepository.findOneByName('Customer')).once();
  });

  it('testCustomerDontExist', async () => {
    when(customerRepository.findOneByName('Customer')).thenResolve(null);
    expect(await isCustomerAlreadyExist.isSatisfiedBy('Customer')).toBe(false);
    verify(customerRepository.findOneByName('Customer')).once();
  });
});
