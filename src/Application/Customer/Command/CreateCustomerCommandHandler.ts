import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Customer } from 'src/Domain/Customer/Customer.entity';
import { CreateCustomerCommand } from './CreateCustomerCommand';
import { ICustomerRepository } from 'src/Domain/Customer/Repository/ICustomerRepository';
import { CustomerAlreadyExistException } from 'src/Domain/Customer/Exception/CustomerAlreadyExistException';
import { IsCustomerAlreadyExist } from 'src/Domain/Customer/Specification/IsCustomerAlreadyExist';
import { IAddressRepository } from 'src/Domain/Customer/Repository/IAddressRepository';
import { Address } from 'src/Domain/Customer/Address.entity';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerCommandHandler {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    @Inject('IAddressRepository')
    private readonly addressRepository: IAddressRepository,
    private readonly isCustomerAlreadyExist: IsCustomerAlreadyExist
  ) {}

  public async execute(command: CreateCustomerCommand): Promise<string> {
    const { name, street, city, country, zipCode } = command;

    if (true === (await this.isCustomerAlreadyExist.isSatisfiedBy(name))) {
      throw new CustomerAlreadyExistException();
    }

    const address = await this.addressRepository.save(
      new Address(street, city, zipCode, country)
    );

    const customer = await this.customerRepository.save(
      new Customer(name, address)
    );

    return customer.getId();
  }
}
