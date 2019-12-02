import {Customer} from '../Customer.entity';

export interface ICustomerRepository {
  save(customer: Customer): Promise<Customer>;
  findOneByName(name: string): Promise<Customer | undefined>;
}
