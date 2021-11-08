import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateContactCommand } from './UpdateContactCommand';
import { IContactRepository } from 'src/Domain/Contact/Repository/IContactRepository';
import { ContactNotFoundException } from 'src/Domain/Contact/Exception/ContactNotFoundException';
import { IsContactEmpty } from 'src/Domain/Contact/Specification/IsContactEmpty';
import { EmptyContactException } from 'src/Domain/Contact/Exception/EmptyContactException';

@CommandHandler(UpdateContactCommand)
export class UpdateContactCommandHandler {
  constructor(
    @Inject('IContactRepository')
    private readonly contactRepository: IContactRepository,
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
      notes
    } = command;

    const contact = await this.contactRepository.findOneById(id);

    if (!contact) {
      throw new ContactNotFoundException();
    }

    if (this.isContactEmpty.isSatisfiedBy(firstName, lastName, company)) {
      throw new EmptyContactException();
    }

    contact.update(firstName, lastName, company, email, phoneNumber, notes);

    await this.contactRepository.save(contact);
  }
}
