import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateCustomerCommand } from './UpdateCustomerCommand';
import { ICustomerRepository } from 'src/Domain/Customer/Repository/ICustomerRepository';
import { CustomerNotFoundException } from 'src/Domain/Customer/Exception/CustomerNotFoundException';
import { IsCustomerAlreadyExist } from 'src/Domain/Customer/Specification/IsCustomerAlreadyExist';
import { CustomerAlreadyExistException } from 'src/Domain/Customer/Exception/CustomerAlreadyExistException';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerCommandHandler {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    private readonly isCustomerAlreadyExist: IsCustomerAlreadyExist
  ) {}

  public async execute(command: UpdateCustomerCommand): Promise<void> {
    const { id, name } = command;

    const customer = await this.customerRepository.findOneById(id);
    if (!customer) {
      throw new CustomerNotFoundException();
    }

    if (
      name !== customer.getName() &&
      true === (await this.isCustomerAlreadyExist.isSatisfiedBy(name))
    ) {
      throw new CustomerAlreadyExistException();
    }

    customer.updateName(name);

    await this.customerRepository.save(customer);
  }
}
