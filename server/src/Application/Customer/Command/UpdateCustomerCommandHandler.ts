import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {UpdateCustomerCommand} from './UpdateCustomerCommand';
import {ICustomerRepository} from 'src/Domain/Customer/Repository/ICustomerRepository';
import {CustomerNotFoundException} from 'src/Domain/Customer/Exception/CustomerNotFoundException';
import {IsCustomerAlreadyExist} from 'src/Domain/Customer/Specification/IsCustomerAlreadyExist';
import {CustomerAlreadyExistException} from 'src/Domain/Customer/Exception/CustomerAlreadyExistException';
import {IAddressRepository} from 'src/Domain/Customer/Repository/IAddressRepository';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerCommandHandler {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    @Inject('IAddressRepository')
    private readonly addressRepository: IAddressRepository,
    private readonly isCustomerAlreadyExist: IsCustomerAlreadyExist
  ) {}

  public async execute(command: UpdateCustomerCommand): Promise<void> {
    const {id, name, city, street, country, zipCode} = command;

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

    const address = customer.getAddress();
    customer.updateName(name);
    address.update(street, city, zipCode, country);

    await Promise.all([
      this.customerRepository.save(customer),
      this.addressRepository.save(address)
    ]);
  }
}
