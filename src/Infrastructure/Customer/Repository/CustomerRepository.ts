import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICustomerRepository } from 'src/Domain/Customer/Repository/ICustomerRepository';
import { Customer } from 'src/Domain/Customer/Customer.entity';
import { MAX_ITEMS_PER_PAGE } from 'src/Application/Common/Pagination';

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
      .where('LOWER(customer.name) = LOWER(:name)', { name })
      .getOne();
  }

  public findOneById(id: string): Promise<Customer | undefined> {
    return this.repository
      .createQueryBuilder('customer')
      .select(['customer.id', 'customer.name'])
      .where('customer.id = :id', { id })
      .getOne();
  }

  public findCustomers(page: number): Promise<[Customer[], number]> {
    return this.repository
      .createQueryBuilder('customer')
      .select(['customer.id', 'customer.name'])
      .orderBy('customer.name', 'ASC')
      .limit(MAX_ITEMS_PER_PAGE)
      .offset((page - 1) * MAX_ITEMS_PER_PAGE)
      .getManyAndCount();
  }
}
