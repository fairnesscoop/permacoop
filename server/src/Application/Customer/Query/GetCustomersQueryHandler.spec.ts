import {mock, instance, when, verify} from 'ts-mockito';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {GetCustomersQueryHandler} from 'src/Application/Customer/Query/GetCustomersQueryHandler';
import {GetCustomersQuery} from 'src/Application/Customer/Query/GetCustomersQuery';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';
import {CustomerRepository} from 'src/Infrastructure/Customer/Repository/CustomerRepository';
import {AddressView} from '../View/AddressView';
import {Address} from 'src/Domain/Customer/Address.entity';

describe('GetCustomersQueryHandler', () => {
  it('testGetCustomers', async () => {
    const customerRepository = mock(CustomerRepository);

    const address1 = mock(Address);
    when(address1.getId()).thenReturn('f4646506-dd8f-490f-927e-d5c54cc035d6');
    when(address1.getCity()).thenReturn('Paris');
    when(address1.getStreet()).thenReturn('116 Avenue du Président Kennedy');
    when(address1.getZipCode()).thenReturn('75016');
    when(address1.getCountry()).thenReturn('FR');

    const address2 = mock(Address);
    when(address2.getId()).thenReturn('62bebec4-e34c-43d5-a6c8-7715dd95d662');
    when(address2.getCity()).thenReturn('Chaville');
    when(address2.getStreet()).thenReturn('855 Avenue Roger Salengro');
    when(address2.getZipCode()).thenReturn('92370');
    when(address2.getCountry()).thenReturn('FR');

    const customer1 = mock(Customer);
    when(customer1.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(customer1.getName()).thenReturn('Radio France');
    when(customer1.getAddress()).thenReturn(instance(address1));

    const customer2 = mock(Customer);
    when(customer2.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(customer2.getName()).thenReturn('Proximum');
    when(customer2.getAddress()).thenReturn(instance(address2));

    when(customerRepository.findCustomers()).thenResolve([
      instance(customer1),
      instance(customer2)
    ]);

    const queryHandler = new GetCustomersQueryHandler(
      instance(customerRepository)
    );

    const expectedResult = [
      new CustomerView(
        'd54f15d6-1a1d-47e8-8672-9f46018f9960',
        'Radio France',
        new AddressView(
          'f4646506-dd8f-490f-927e-d5c54cc035d6',
          '116 Avenue du Président Kennedy',
          'Paris',
          '75016',
          'FR'
        )
      ),
      new CustomerView(
        'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
        'Proximum',
        new AddressView(
          '62bebec4-e34c-43d5-a6c8-7715dd95d662',
          '855 Avenue Roger Salengro',
          'Chaville',
          '92370',
          'FR'
        )
      )
    ];

    expect(await queryHandler.execute(new GetCustomersQuery())).toMatchObject(
      expectedResult
    );

    verify(customerRepository.findCustomers()).once();
  });

  it('testGetEmptyCustomers', async () => {
    const customerRepository = mock(CustomerRepository);

    when(customerRepository.findCustomers()).thenResolve([]);

    const queryHandler = new GetCustomersQueryHandler(
      instance(customerRepository)
    );

    expect(await queryHandler.execute(new GetCustomersQuery())).toMatchObject(
      []
    );

    verify(customerRepository.findCustomers()).once();
  });
});
