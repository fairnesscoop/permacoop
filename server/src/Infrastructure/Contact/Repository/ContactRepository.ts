import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/Domain/Contact/Contact.entity';
import { IContactRepository } from 'src/Domain/Contact/Repository/IContactRepository';
import { Repository } from 'typeorm';
import { MAX_ITEMS_PER_PAGE } from 'src/Application/Common/Pagination';

@Injectable()
export class ContactRepository implements IContactRepository {
  constructor(
    @InjectRepository(Contact)
    private readonly repository: Repository<Contact>
  ) {}

  public save(contact: Contact): Promise<Contact> {
    return this.repository.save(contact);
  }

  public findContacts(page: number): Promise<[Contact[], number]> {
    return this.repository
      .createQueryBuilder('contact')
      .select([
        'contact.id',
        'contact.firstName',
        'contact.lastName',
        'contact.company',
        'contact.email',
        'contact.phoneNumber',
        'contact.notes'
      ])
      .orderBy('contact.lastName', 'ASC')
      .addOrderBy('contact.firstName', 'ASC')
      .limit(MAX_ITEMS_PER_PAGE)
      .offset((page - 1) * MAX_ITEMS_PER_PAGE)
      .getManyAndCount();
  }
}
