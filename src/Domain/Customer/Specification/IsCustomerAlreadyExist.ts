import { Inject } from '@nestjs/common';
import { ICustomerRepository } from '../Repository/ICustomerRepository';
import { Customer } from '../Customer.entity';

export class IsCustomerAlreadyExist {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository
  ) {}

  public async isSatisfiedBy(name: string): Promise<boolean> {
    return (
      (await this.customerRepository.findOneByName(name)) instanceof Customer
    );
  }
}
