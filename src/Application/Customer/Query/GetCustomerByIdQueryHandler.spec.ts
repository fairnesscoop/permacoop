import { mock, instance, when, verify } from 'ts-mockito';
import { CustomerRepository } from 'src/Infrastructure/Customer/Repository/CustomerRepository';
import { Customer } from 'src/Domain/Customer/Customer.entity';
import { CustomerView } from 'src/Application/Customer/View/CustomerView';
import { GetCustomerByIdQueryHandler } from './GetCustomerByIdQueryHandler';
import { GetCustomerByIdQuery } from './GetCustomerByIdQuery';
import { CustomerNotFoundException } from 'src/Domain/Customer/Exception/CustomerNotFoundException';

describe('GetCustomerByIdQueryHandler', () => {
  const query = new GetCustomerByIdQuery(
    'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2'
  );

  it('testGetCustomer', async () => {
    const customerRepository = mock(CustomerRepository);
    const queryHandler = new GetCustomerByIdQueryHandler(
      instance(customerRepository)
    );
    const expectedResult = new CustomerView(
      'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
      'Radio France'
    );
    const customer = mock(Customer);

    when(customer.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(customer.getName()).thenReturn('Radio France');

    when(
      customerRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(customer));

    expect(await queryHandler.execute(query)).toMatchObject(expectedResult);

    verify(
      customerRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
  });

  it('testGetCustomerNotFound', async () => {
    const customerRepository = mock(CustomerRepository);
    const queryHandler = new GetCustomerByIdQueryHandler(
      instance(customerRepository)
    );
    when(
      customerRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      await queryHandler.execute(query);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomerNotFoundException);
      expect(e.message).toBe('crm.customers.errors.not_found');
      verify(
        customerRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
