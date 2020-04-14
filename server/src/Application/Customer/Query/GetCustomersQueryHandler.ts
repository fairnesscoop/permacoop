import {Inject} from '@nestjs/common';
import {QueryHandler} from '@nestjs/cqrs';
import {GetCustomersQuery} from './GetCustomersQuery';
import {CustomerView} from '../View/CustomerView';
import {ICustomerRepository} from 'src/Domain/Customer/Repository/ICustomerRepository';
import {AddressView} from '../View/AddressView';

@QueryHandler(GetCustomersQuery)
export class GetCustomersQueryHandler {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository
  ) {}

  public async execute(query: GetCustomersQuery): Promise<CustomerView[]> {
    const customers = await this.customerRepository.findCustomers();
    const customerViews: CustomerView[] = [];

    for (const customer of customers) {
      const address = customer.getAddress();

      customerViews.push(
        new CustomerView(
          customer.getId(),
          customer.getName(),
          new AddressView(
            address.getId(),
            address.getStreet(),
            address.getCity(),
            address.getZipCode(),
            address.getCountry()
          )
        )
      );
    }

    return customerViews;
  }
}
