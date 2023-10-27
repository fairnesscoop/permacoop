import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCustomerByIdQuery } from './GetCustomerByIdQuery';
import { ICustomerRepository } from 'src/Domain/Customer/Repository/ICustomerRepository';
import { CustomerView } from '../View/CustomerView';
import { CustomerNotFoundException } from 'src/Domain/Customer/Exception/CustomerNotFoundException';
import { AddressView } from '../View/AddressView';

@QueryHandler(GetCustomerByIdQuery)
export class GetCustomerByIdQueryHandler {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository
  ) {}

  public async execute(query: GetCustomerByIdQuery): Promise<CustomerView> {
    const customer = await this.customerRepository.findOneById(query.id);
    if (!customer) {
      throw new CustomerNotFoundException();
    }

    const address = customer.getAddress();

    return new CustomerView(
      customer.getId(),
      customer.getName(),
      new AddressView(
        address.getId(),
        address.getStreet(),
        address.getCity(),
        address.getZipCode(),
        address.getCountry()
      )
    );
  }
}
