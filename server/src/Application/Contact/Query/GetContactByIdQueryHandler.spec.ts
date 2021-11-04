import { mock, instance, when, verify } from 'ts-mockito';
import { ContactRepository } from 'src/Infrastructure/Contact/Repository/ContactRepository';
import { Contact } from 'src/Domain/Contact/Contact.entity';
import { ContactView } from 'src/Application/Contact/View/ContactView';
import { GetContactByIdQueryHandler } from './GetContactByIdQueryHandler';
import { GetContactByIdQuery } from './GetContactByIdQuery';
import { ContactNotFoundException } from 'src/Domain/Contact/Exception/ContactNotFoundException';

describe('GetContactByIdQueryHandler', () => {
  const query = new GetContactByIdQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');

  it('testGetContact', async () => {
    const contactRepository = mock(ContactRepository);
    const handler = new GetContactByIdQueryHandler(instance(contactRepository));

    const contact = mock(Contact);
    when(contact.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(contact.getFirstName()).thenReturn('Sarah');
    when(contact.getLastName()).thenReturn('Conor');
    when(contact.getCompany()).thenReturn('Aperture Science');
    when(contact.getEmail()).thenReturn('sarah.conor@aperture.org');
    when(contact.getPhoneNumber()).thenReturn('0687654321');
    when(contact.getNotes()).thenReturn('Encountered crossing portals');

    when(
      contactRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(contact));

    const expectedResult = new ContactView(
      'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
      'Sarah',
      'Conor',
      'Aperture Science',
      'sarah.conor@aperture.org',
      '0687654321',
      'Encountered crossing portals'
    );

    expect(await handler.execute(query)).toMatchObject(expectedResult);

    verify(
      contactRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
  });

  it('testGetContactNotFound', async () => {
    const contactRepository = mock(ContactRepository);
    const handler = new GetContactByIdQueryHandler(instance(contactRepository));

    when(
      contactRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      await handler.execute(query);
    } catch (e) {
      expect(e).toBeInstanceOf(ContactNotFoundException);
      expect(e.message).toBe('crm.contacts.errors.not_found');
      verify(
        contactRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
