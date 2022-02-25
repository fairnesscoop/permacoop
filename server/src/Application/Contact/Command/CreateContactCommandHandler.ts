import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Contact } from 'src/Domain/Contact/Contact.entity';
import { EmptyContactException } from 'src/Domain/Contact/Exception/EmptyContactException';
import { IContactRepository } from 'src/Domain/Contact/Repository/IContactRepository';
import { IsContactEmpty } from 'src/Domain/Contact/Specification/IsContactEmpty';
import { UserNotFoundException } from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import { CreateContactCommand } from './CreateContactCommand';

@CommandHandler(CreateContactCommand)
export class CreateContactCommandHandler {
  constructor(
    @Inject('IContactRepository')
    private readonly contactRepository: IContactRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly isContactEmpty: IsContactEmpty
  ) {}

  public async execute(command: CreateContactCommand): Promise<string> {
    const { firstName, lastName, company, email, phoneNumber, notes, contactedById } = command;

    if (this.isContactEmpty.isSatisfiedBy(firstName, lastName, company)) {
      throw new EmptyContactException();
    }

    let user = null;

    if (contactedById) {
      user = await this.userRepository.findOneById(contactedById);
      if (!user) {
        throw new UserNotFoundException();
      }
    }

    const contact = await this.contactRepository.save(
      new Contact(firstName, lastName, company, email, phoneNumber, notes, user)
    );

    return contact.getId();
  }
}
