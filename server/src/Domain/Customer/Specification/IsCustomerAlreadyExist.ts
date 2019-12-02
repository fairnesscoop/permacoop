import {Injectable, Inject} from '@nestjs/common';
import {ISpecification} from 'src/Domain/ISpecification';
import {ICustomerRepository} from '../Repository/ICustomerRepository';
import {Customer} from '../Customer.entity';

@Injectable()
export class IsCustomerAlreadyExist implements ISpecification {
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
