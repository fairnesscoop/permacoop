import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ICustomerRepository} from 'src/Domain/Customer/Repository/ICustomerRepository';
import {Customer} from 'src/Domain/Customer/Customer.entity';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>
  ) {}

  public save(customer: Customer): Promise<Customer> {
    return this.repository.save(customer);
  }

  public findOneByName(name: string): Promise<Customer | undefined> {
    return this.repository
      .createQueryBuilder('customer')
      .where('LOWER(customer.name) = LOWER(:name)', {name})
      .getOne();
  }
}
