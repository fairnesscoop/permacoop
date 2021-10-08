import { Contact } from '../Contact.entity';

export interface IContactRepository {
  save(contact: Contact): Promise<Contact>;
}
