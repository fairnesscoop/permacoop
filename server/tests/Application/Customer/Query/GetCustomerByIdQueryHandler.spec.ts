import {mock, instance, when} from 'ts-mockito';
import {GetCustomerByIdQueryHandler} from 'src/Application/Customer/Query/GetCustomerByIdQueryHandler';
import {CustomerRepository} from 'src/Infrastructure/Customer/Repository/CustomerRepository';
import {GetCustomerByIdQuery} from 'src/Application/Customer/Query/GetCustomerByIdQuery';
import {Customer} from 'src/Domain/Customer/Customer.entity';

describe('GetCustomerByIdQueryHandler', () => {
  it('testGetCustomerById', async () => {
    const customerRepository = mock(CustomerRepository);
    const query = new GetCustomerByIdQueryHandler(instance(customerRepository));
    const customer = new Customer('Radio France');

    when(
      customerRepository.findOneById('2a29a2d2-328d-4e34-8b99-ddfcec536696')
    ).thenResolve(customer);

    expect(
      await query.execute(
        new GetCustomerByIdQuery('2a29a2d2-328d-4e34-8b99-ddfcec536696')
      )
    ).toMatchObject(customer);
  });
});
