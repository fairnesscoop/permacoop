import {Inject} from '@nestjs/common';
import {CommandHandler} from '@nestjs/cqrs';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {CreateCustomerCommand} from './CreateCustomerCommand';
import {CustomerView} from '../View/CustomerView';
import {ICustomerRepository} from 'src/Domain/Customer/Repository/ICustomerRepository';
import {CustomerAlreadyExistException} from 'src/Domain/Customer/Exception/CustomerAlreadyExistException';
import {IsCustomerAlreadyExist} from 'src/Domain/Customer/Specification/IsCustomerAlreadyExist';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerCommandHandler {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    private readonly isCustomerAlreadyExist: IsCustomerAlreadyExist
  ) {}

  public async execute(command: CreateCustomerCommand): Promise<CustomerView> {
    const {name} = command;

    if (true === (await this.isCustomerAlreadyExist.isSatisfiedBy(name))) {
      throw new CustomerAlreadyExistException();
    }

    const customer = await this.customerRepository.save(new Customer(name));

    return new CustomerView(customer.getId(), customer.getName());
  }
}
