import { mock, instance, when, verify, anything } from 'ts-mockito';
import { ContactRepository } from 'src/Infrastructure/Contact/Repository/ContactRepository';
import { Contact } from 'src/Domain/Contact/Contact.entity';
import { UpdateContactCommand } from './UpdateContactCommand';
import { ContactNotFoundException } from 'src/Domain/Contact/Exception/ContactNotFoundException';
import { UpdateContactCommandHandler } from './UpdateContactCommandHandler';

describe('UpdateContactCommandHandler', () => {
  let contactRepository: ContactRepository;
  let updatedContact: Contact;
  let handler: UpdateContactCommandHandler;

  const command = new UpdateContactCommand(
    '2d5fb4da-12c2-11ea-8d71-362b9e155667',
    'Sarah',
    'Conor',
    'Aperture Science',
    'sarah.conor@aperture.org',
    '0612345678',
    'Lorem ipsum'
  );

  beforeEach(() => {
    contactRepository = mock(ContactRepository);
    updatedContact = mock(Contact);

    handler = new UpdateContactCommandHandler(instance(contactRepository));
  });

  it('testUpdateSuccessfully', async () => {
    when(
      contactRepository.findOneById('2d5fb4da-12c2-11ea-8d71-362b9e155667')
    ).thenResolve(instance(updatedContact));

    expect(await handler.execute(command)).toBeUndefined();

    verify(contactRepository.save(instance(updatedContact))).once();
    verify(
      updatedContact.update(
        'Sarah',
        'Conor',
        'Aperture Science',
        'sarah.conor@aperture.org',
        '0612345678',
        'Lorem ipsum'
      )
    ).once();
    verify(
      updatedContact.update(
        'Sarah',
        'Conor',
        'Aperture Science',
        'sarah.conor@aperture.org',
        '0612345678',
        'Lorem ipsum'
      )
    ).calledBefore(contactRepository.save(instance(updatedContact)));
  });

  it('testContactNotFound', async () => {
    when(
      contactRepository.findOneById('2d5fb4da-12c2-11ea-8d71-362b9e155667')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(ContactNotFoundException);
      expect(e.message).toBe('crm.contacts.errors.not_found');
      verify(contactRepository.save(anything())).never();
      verify(
        updatedContact.update(
          anything(),
          anything(),
          anything(),
          anything(),
          anything(),
          anything()
        )
      ).never();
      verify(updatedContact.getFirstName()).never();
    }
  });
});
