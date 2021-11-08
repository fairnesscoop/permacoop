import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateContactCommand } from './UpdateContactCommand';
import { IContactRepository } from 'src/Domain/Contact/Repository/IContactRepository';
import { ContactNotFoundException } from 'src/Domain/Contact/Exception/ContactNotFoundException';

@CommandHandler(UpdateContactCommand)
export class UpdateContactCommandHandler {
  constructor(
    @Inject('IContactRepository')
    private readonly contactRepository: IContactRepository
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

    contact.update(firstName, lastName, company, email, phoneNumber, notes);

    await this.contactRepository.save(contact);
  }
}
