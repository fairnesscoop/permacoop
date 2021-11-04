import { Contact } from '../Contact.entity';

export interface IContactRepository {
  save(contact: Contact): Promise<Contact>;
  findOneById(id: string): Promise<Contact | undefined>;
  findContacts(page: number): Promise<[Contact[], number]>;
}
