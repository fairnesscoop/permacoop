import {QueryHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {GetCustomerByIdQuery} from './GetCustomerByIdQuery';
import {ICustomerRepository} from 'src/Domain/Customer/Repository/ICustomerRepository';
import {Customer} from 'src/Domain/Customer/Customer.entity';

@QueryHandler(GetCustomerByIdQuery)
export class GetCustomerByIdQueryHandler {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository
  ) {}

  public execute(query: GetCustomerByIdQuery): Promise<Customer | undefined> {
    return this.customerRepository.findOneById(query.id);
  }
}
