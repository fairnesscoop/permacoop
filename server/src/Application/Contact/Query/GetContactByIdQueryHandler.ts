import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetContactByIdQuery } from './GetContactByIdQuery';
import { IContactRepository } from 'src/Domain/Contact/Repository/IContactRepository';
import { ContactView } from '../View/ContactView';
import { ContactNotFoundException } from 'src/Domain/Contact/Exception/ContactNotFoundException';

@QueryHandler(GetContactByIdQuery)
export class GetContactByIdQueryHandler {
  constructor(
    @Inject('IContactRepository')
    private readonly contactRepository: IContactRepository
  ) {}

  public async execute(query: GetContactByIdQuery): Promise<ContactView> {
    const contact = await this.contactRepository.findOneById(query.id);

    if (!contact) {
      throw new ContactNotFoundException();
    }

    return new ContactView(
      contact.getId(),
      contact.getFirstName(),
      contact.getLastName(),
      contact.getCompany(),
      contact.getEmail(),
      contact.getPhoneNumber(),
      contact.getNotes(),
      contact.getContactedBy()?.getId()
    );
  }
}
