import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { Contact } from 'src/Domain/Contact/Contact.entity';
import { EmptyContactException } from 'src/Domain/Contact/Exception/EmptyContactException';
import { IContactRepository } from 'src/Domain/Contact/Repository/IContactRepository';
import { IsContactEmpty } from 'src/Domain/Contact/Specification/IsContactEmpty';
import { CreateContactCommand } from './CreateContactCommand';

@CommandHandler(CreateContactCommand)
export class CreateContactCommandHandler {
  constructor(
    @Inject('IContactRepository')
    private readonly contactRepository: IContactRepository,
    private readonly isContactEmpty: IsContactEmpty
  ) {}

  public async execute(command: CreateContactCommand): Promise<string> {
    const { firstName, lastName, company, email, phoneNumber, notes } = command;

    if (this.isContactEmpty.isSatisfiedBy(firstName, lastName, company)) {
      throw new EmptyContactException();
    }

    const contact = await this.contactRepository.save(
      new Contact(firstName, lastName, company, email, phoneNumber, notes)
    );

    return contact.getId();
  }
}
