import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/Domain/Contact/Contact.entity';
import { IContactRepository } from 'src/Domain/Contact/Repository/IContactRepository';
import { Repository } from 'typeorm';

export class ContactRepository implements IContactRepository {
  constructor(
    @InjectRepository(Contact)
    private readonly repository: Repository<Contact>
  ) {}

  public save(contact: Contact): Promise<Contact> {
    return this.repository.save(contact);
  }
}
