import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Contact } from 'src/Domain/Contact/Contact.entity';
import { EmptyContactException } from 'src/Domain/Contact/Exception/EmptyContactException';
import { IContactRepository } from 'src/Domain/Contact/Repository/IContactRepository';
import { CreateContactCommand } from './CreateContactCommand';

@CommandHandler(CreateContactCommand)
export class CreateContactCommandHandler {
  constructor(
    @Inject('IContactRepository')
    private readonly contactRepository: IContactRepository
  ) {}

  public async execute(command: CreateContactCommand): Promise<string> {
    const { firstName, lastName, company, email, phoneNumber, notes } = command;

    if (!firstName && !lastName && !company) {
      throw new EmptyContactException();
    }

    const contact = await this.contactRepository.save(
      new Contact(firstName, lastName, company, email, phoneNumber, notes)
    );

    return contact.getId();
  }
}
