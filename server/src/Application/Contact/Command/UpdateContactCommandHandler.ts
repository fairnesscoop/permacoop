import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateContactCommand } from './UpdateContactCommand';
import { IContactRepository } from 'src/Domain/Contact/Repository/IContactRepository';
import { ContactNotFoundException } from 'src/Domain/Contact/Exception/ContactNotFoundException';
import { IsContactEmpty } from 'src/Domain/Contact/Specification/IsContactEmpty';
import { EmptyContactException } from 'src/Domain/Contact/Exception/EmptyContactException';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import { UserNotFoundException } from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';

@CommandHandler(UpdateContactCommand)
export class UpdateContactCommandHandler {
  constructor(
    @Inject('IContactRepository')
    private readonly contactRepository: IContactRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly isContactEmpty: IsContactEmpty
  ) {}

  public async execute(command: UpdateContactCommand): Promise<void> {
    const {
      id,
      firstName,
      lastName,
      company,
      email,
      phoneNumber,
      notes,
      contactedById
    } = command;

    const contact = await this.contactRepository.findOneById(id);

    if (!contact) {
      throw new ContactNotFoundException();
    }

    if (this.isContactEmpty.isSatisfiedBy(firstName, lastName, company)) {
      throw new EmptyContactException();
    }

    let contactedBy = null;
    if (contactedById) {
      contactedBy = await this.userRepository.findOneById(contactedById);
      if (!contactedBy) {
        throw new UserNotFoundException();
      }
    }

    contact.update(firstName, lastName, company, email, phoneNumber, notes, contactedBy);

    await this.contactRepository.save(contact);
  }
}
