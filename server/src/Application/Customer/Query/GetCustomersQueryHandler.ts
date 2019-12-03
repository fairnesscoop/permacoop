import {Inject} from '@nestjs/common';
import {QueryHandler} from '@nestjs/cqrs';
import {GetCustomersQuery} from './GetCustomersQuery';
import {CustomerView} from '../View/CustomerView';
import {ICustomerRepository} from 'src/Domain/Customer/Repository/ICustomerRepository';

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
      customerViews.push(
        new CustomerView(customer.getId(), customer.getName())
      );
    }

    return customerViews;
  }
}
