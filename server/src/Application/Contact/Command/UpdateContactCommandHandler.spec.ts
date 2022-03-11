import { mock, instance, when, verify, anything } from 'ts-mockito';
import { ContactRepository } from 'src/Infrastructure/Contact/Repository/ContactRepository';
import { Contact } from 'src/Domain/Contact/Contact.entity';
import { UpdateContactCommand } from './UpdateContactCommand';
import { ContactNotFoundException } from 'src/Domain/Contact/Exception/ContactNotFoundException';
import { IsContactEmpty } from 'src/Domain/Contact/Specification/IsContactEmpty';
import { UpdateContactCommandHandler } from './UpdateContactCommandHandler';
import { EmptyContactException } from 'src/Domain/Contact/Exception/EmptyContactException';
import { UserRepository } from 'src/Infrastructure/HumanResource/User/Repository/UserRepository';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { UserNotFoundException } from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';

describe('UpdateContactCommandHandler', () => {
  let contactRepository: ContactRepository;
  let userRepository: UserRepository;
  let updatedContact: Contact;
  let updatedContactedBy: User;
  let handler: UpdateContactCommandHandler;

  let command = new UpdateContactCommand(
    '2d5fb4da-12c2-11ea-8d71-362b9e155667',
    'Sarah',
    'Conor',
    'Aperture Science',
    'sarah.conor@aperture.org',
    '0612345678',
    'Lorem ipsum',
    '4dd8e851-8768-4d71-ae87-c81bbb7b3959'
  );

  beforeEach(() => {
    contactRepository = mock(ContactRepository);
    userRepository = mock(UserRepository);
    updatedContact = mock(Contact);
    updatedContactedBy = mock(User);

    handler = new UpdateContactCommandHandler(
      instance(contactRepository),
      instance(userRepository),
      new IsContactEmpty()
    );
  });

  it('testUpdateSuccessfully', async () => {
    when(
      contactRepository.findOneById('2d5fb4da-12c2-11ea-8d71-362b9e155667')
    ).thenResolve(instance(updatedContact));

    when(
      userRepository.findOneById('4dd8e851-8768-4d71-ae87-c81bbb7b3959')
    ).thenResolve(instance(updatedContactedBy));

    expect(await handler.execute(command)).toBeUndefined();

    verify(contactRepository.save(instance(updatedContact))).once();
    verify(
      updatedContact.update(
        'Sarah',
        'Conor',
        'Aperture Science',
        'sarah.conor@aperture.org',
        '0612345678',
        'Lorem ipsum',
        instance(updatedContactedBy)
      )
    ).once();
    verify(
      updatedContact.update(
        'Sarah',
        'Conor',
        'Aperture Science',
        'sarah.conor@aperture.org',
        '0612345678',
        'Lorem ipsum',
        instance(updatedContactedBy)
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
          anything(),
          anything()
        )
      ).never();
      verify(updatedContact.getFirstName()).never();
    }
  });

  it('testContactedByNotFound', async () => {
    when(
      contactRepository.findOneById('2d5fb4da-12c2-11ea-8d71-362b9e155667')
    ).thenResolve(instance(updatedContact));
    when(
      userRepository.findOneById('4dd8e851-8768-4d71-ae87-c81bbb7b3959')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(UserNotFoundException);
      expect(e.message).toBe('human_resources.users.errors.not_found');
      verify(contactRepository.save(anything())).never();
      verify(
        updatedContact.update(
          anything(),
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

  it('testUpdateEmpty', async () => {
    when(
      contactRepository.findOneById('2d5fb4da-12c2-11ea-8d71-362b9e155667')
    ).thenResolve(instance(updatedContact));

    command = new UpdateContactCommand(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667',
      '',
      '',
      '',
      'sarah.conor@aperture.org',
      '0612345678',
      'Lorem ipsum',
      null
    );

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(EmptyContactException);
      expect(e.message).toBe('crm.contacts.errors.empty');
      verify(contactRepository.save(anything())).never();
      verify(
        updatedContact.update(
          anything(),
          anything(),
          anything(),
          anything(),
          anything(),
          anything(),
          anything()
        )
      ).never();
    }
  });
});
