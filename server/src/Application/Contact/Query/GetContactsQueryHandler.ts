import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { GetContactsQuery } from './GetContactsQuery';
import { ContactView } from '../View/ContactView';
import { IContactRepository } from 'src/Domain/Contact/Repository/IContactRepository';
import { Pagination } from 'src/Application/Common/Pagination';

@QueryHandler(GetContactsQuery)
export class GetContactsQueryHandler {
  constructor(
    @Inject('IContactRepository')
    private readonly contactRepository: IContactRepository
  ) {}

  public async execute(
    query: GetContactsQuery
  ): Promise<Pagination<ContactView>> {
    const contactsView: ContactView[] = [];
    const [contacts, total] = await this.contactRepository.findContacts(
      query.page
    );

    for (const contact of contacts) {
      contactsView.push(
        new ContactView(
          contact.getId(),
          contact.getFirstName(),
          contact.getLastName(),
          contact.getCompany(),
          contact.getEmail(),
          contact.getPhoneNumber(),
          contact.getNotes()
        )
      );
    }

    return new Pagination<ContactView>(contactsView, total);
  }
}
