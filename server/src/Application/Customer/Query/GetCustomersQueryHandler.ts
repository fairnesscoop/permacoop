import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { GetCustomersQuery } from './GetCustomersQuery';
import { CustomerView } from '../View/CustomerView';
import { ICustomerRepository } from 'src/Domain/Customer/Repository/ICustomerRepository';
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
      customerViews.push(
        new CustomerView(customer.getId(), customer.getName())
      );
    }

    return new Pagination<CustomerView>(customerViews, total);
  }
}
