import { mock, instance, when, verify } from 'ts-mockito';
import { Contact } from 'src/Domain/Contact/Contact.entity';
import { GetContactsQueryHandler } from 'src/Application/Contact/Query/GetContactsQueryHandler';
import { GetContactsQuery } from 'src/Application/Contact/Query/GetContactsQuery';
import { ContactView } from 'src/Application/Contact/View/ContactView';
import { ContactRepository } from 'src/Infrastructure/Contact/Repository/ContactRepository';
import { Pagination } from 'src/Application/Common/Pagination';

describe('GetContactsQueryHandler', () => {
  it('testGetContacts', async () => {
    const contactRepository = mock(ContactRepository);

    const contact1 = mock(Contact);
    when(contact1.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(contact1.getFirstName()).thenReturn('John');
    when(contact1.getLastName()).thenReturn('Doe');
    when(contact1.getCompany()).thenReturn('Self');
    when(contact1.getEmail()).thenReturn('john@doe.com');
    when(contact1.getPhoneNumber()).thenReturn('0612345678');
    when(contact1.getNotes()).thenReturn('Co-coworker');

    const contact2 = mock(Contact);
    when(contact2.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(contact2.getFirstName()).thenReturn('Sarah');
    when(contact2.getLastName()).thenReturn('Conor');
    when(contact2.getCompany()).thenReturn('Aperture Science');
    when(contact2.getEmail()).thenReturn('sarah.conor@aperture.org');
    when(contact2.getPhoneNumber()).thenReturn('0687654321');
    when(contact2.getNotes()).thenReturn('Encountered crossing portals');

    when(contactRepository.findContacts(1)).thenResolve([
      [instance(contact1), instance(contact2)],
      2
    ]);

    const queryHandler = new GetContactsQueryHandler(
      instance(contactRepository)
    );

    const expectedResult = new Pagination<ContactView>(
      [
        new ContactView(
          'd54f15d6-1a1d-47e8-8672-9f46018f9960',
          'John',
          'Doe',
          'Self',
          'john@doe.com',
          '0612345678',
          'Co-coworker'
        ),
        new ContactView(
          'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
          'Sarah',
          'Conor',
          'Aperture Science',
          'sarah.conor@aperture.org',
          '0687654321',
          'Encountered crossing portals'
        )
      ],
      2
    );

    expect(await queryHandler.execute(new GetContactsQuery(1))).toMatchObject(
      expectedResult
    );

    verify(contactRepository.findContacts(1)).once();
  });
});
