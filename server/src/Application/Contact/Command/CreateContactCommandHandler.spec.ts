import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { ContactRepository } from 'src/Infrastructure/Contact/Repository/ContactRepository';
import { Contact } from 'src/Domain/Contact/Contact.entity';
import { EmptyContactException } from 'src/Domain/Contact/Exception/EmptyContactException';
import { CreateContactCommandHandler } from 'src/Application/Contact/Command/CreateContactCommandHandler';
import { CreateContactCommand } from './CreateContactCommand';

describe('CreateContactCommandHandler', () => {
  let contactRepository: ContactRepository;
  let createdContact: Contact;
  let handler: CreateContactCommandHandler;

  beforeEach(() => {
    contactRepository = mock(ContactRepository);
    createdContact = mock(Contact);
    handler = new CreateContactCommandHandler(instance(contactRepository));
  });

  it('testContactCreatedSuccessfully', async () => {
    when(createdContact.getId()).thenReturn(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );
    when(
      contactRepository.save(
        deepEqual(
          new Contact(
            'Sarah',
            'Conor',
            'Aperture Science',
            'sarah.conor@aperture.org',
            '0612345678',
            'Lorem ipsum'
          )
        )
      )
    ).thenResolve(instance(createdContact));

    expect(
      await handler.execute(
        new CreateContactCommand(
          'Sarah',
          'Conor',
          'Aperture Science',
          'sarah.conor@aperture.org',
          '0612345678',
          'Lorem ipsum'
        )
      )
    ).toBe('2d5fb4da-12c2-11ea-8d71-362b9e155667');

    verify(
      contactRepository.save(
        deepEqual(
          new Contact(
            'Sarah',
            'Conor',
            'Aperture Science',
            'sarah.conor@aperture.org',
            '0612345678',
            'Lorem ipsum'
          )
        )
      )
    ).once();
    verify(createdContact.getId()).once();
  });

  it('testEmptyContact', async () => {
    try {
      await handler.execute(
        new CreateContactCommand(
          null,
          null,
          null,
          'sarah.conor@aperture.org',
          '0612345678',
          'Lorem ipsum'
        )
      );
    } catch (e) {
      expect(e).toBeInstanceOf(EmptyContactException);
      expect(e.message).toBe('crm.contacts.errors.empty');
      verify(contactRepository.save(anything())).never();
      verify(createdContact.getId()).never();
    }
  });
});
