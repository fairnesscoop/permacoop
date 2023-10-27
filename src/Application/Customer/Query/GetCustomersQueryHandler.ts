import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { GetCustomersQuery } from './GetCustomersQuery';
import { CustomerView } from '../View/CustomerView';
import { ICustomerRepository } from 'src/Domain/Customer/Repository/ICustomerRepository';
import { AddressView } from '../View/AddressView';
import { Pagination } from 'src/Application/Common/Pagination';

@QueryHandler(GetCustomersQuery)
export class GetCustomersQueryHandler {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository
  ) {}

  public async execute(
    query: GetCustomersQuery
  ): Promise<Pagination<CustomerView>> {
    const customerViews: CustomerView[] = [];
    const [customers, total] = await this.customerRepository.findCustomers(
      query.page
    );

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

    return new Pagination<CustomerView>(customerViews, total);
  }
}
