import { mock, instance, when, verify, anything, deepEqual } from 'ts-mockito';
import { DeleteContactCommandHandler } from './DeleteContactCommandHandler';
import { DeleteContactCommand } from './DeleteContactCommand';
import { ContactNotFoundException } from 'src/Domain/Contact/Exception/ContactNotFoundException';
import { Contact } from 'src/Domain/Contact/Contact.entity';
import { ContactRepository } from 'src/Infrastructure/Contact/Repository/ContactRepository';

describe('DeleteContactCommandHandler', () => {
  let contactRepository: ContactRepository;
  let handler: DeleteContactCommandHandler;

  const contact = mock(Contact);
  const command = new DeleteContactCommand(
    '2d5fb4da-12c2-11ea-8d71-362b9e155667'
  );

  beforeEach(() => {
    contactRepository = mock(ContactRepository);

    handler = new DeleteContactCommandHandler(instance(contactRepository));
  });

  it('testContactNotFound', async () => {
    when(
      contactRepository.findOneById('2d5fb4da-12c2-11ea-8d71-362b9e155667')
    ).thenResolve(null);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(ContactNotFoundException);
      expect(e.message).toBe('crm.contacts.errors.not_found');
      verify(
        contactRepository.findOneById('2d5fb4da-12c2-11ea-8d71-362b9e155667')
      ).once();
      verify(contactRepository.remove(anything())).never();
    }
  });

  it('testContactSuccessfullyDeleted', async () => {
    when(
      contactRepository.findOneById('2d5fb4da-12c2-11ea-8d71-362b9e155667')
    ).thenResolve(instance(contact));

    expect(await handler.execute(command)).toBeUndefined();

    verify(
      contactRepository.findOneById('2d5fb4da-12c2-11ea-8d71-362b9e155667')
    ).once();
    verify(contactRepository.remove(instance(contact))).once();
  });
});
