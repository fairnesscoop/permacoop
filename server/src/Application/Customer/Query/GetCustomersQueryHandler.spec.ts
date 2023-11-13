import { mock, instance, when, verify } from 'ts-mockito';
import { Customer } from 'src/Domain/Customer/Customer.entity';
import { GetCustomersQueryHandler } from 'src/Application/Customer/Query/GetCustomersQueryHandler';
import { GetCustomersQuery } from 'src/Application/Customer/Query/GetCustomersQuery';
import { CustomerView } from 'src/Application/Customer/View/CustomerView';
import { CustomerRepository } from 'src/Infrastructure/Customer/Repository/CustomerRepository';
import { Pagination } from 'src/Application/Common/Pagination';

describe('GetCustomersQueryHandler', () => {
  it('testGetCustomers', async () => {
    const customerRepository = mock(CustomerRepository);

    const customer1 = mock(Customer);
    when(customer1.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(customer1.getName()).thenReturn('Radio France');

    const customer2 = mock(Customer);
    when(customer2.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(customer2.getName()).thenReturn('Proximum');

    when(customerRepository.findCustomers(1)).thenResolve([
      [instance(customer1), instance(customer2)],
      2
    ]);

    const queryHandler = new GetCustomersQueryHandler(
      instance(customerRepository)
    );

    const expectedResult = new Pagination<CustomerView>(
      [
        new CustomerView(
          'd54f15d6-1a1d-47e8-8672-9f46018f9960',
          'Radio France'
        ),
        new CustomerView('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2', 'Proximum')
      ],
      2
    );

    expect(await queryHandler.execute(new GetCustomersQuery(1))).toMatchObject(
      expectedResult
    );

    verify(customerRepository.findCustomers(1)).once();
  });
});
