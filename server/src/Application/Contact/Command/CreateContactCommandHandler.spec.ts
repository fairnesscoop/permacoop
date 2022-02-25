import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { ContactRepository } from 'src/Infrastructure/Contact/Repository/ContactRepository';
import { Contact } from 'src/Domain/Contact/Contact.entity';
import { EmptyContactException } from 'src/Domain/Contact/Exception/EmptyContactException';
import { IsContactEmpty } from 'src/Domain/Contact/Specification/IsContactEmpty';
import { CreateContactCommandHandler } from 'src/Application/Contact/Command/CreateContactCommandHandler';
import { CreateContactCommand } from './CreateContactCommand';
import { UserRepository } from 'src/Infrastructure/HumanResource/User/Repository/UserRepository';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { UserNotFoundException } from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';

describe('CreateContactCommandHandler', () => {
  let contactRepository: ContactRepository;
  let userRepository: UserRepository;
  let createdContact: Contact;
  let handler: CreateContactCommandHandler;
  let user: User;

  beforeEach(() => {
    contactRepository = mock(ContactRepository);
    userRepository = mock(UserRepository);
    createdContact = mock(Contact);
    user = mock(User);
    handler = new CreateContactCommandHandler(
      instance(contactRepository),
      instance(userRepository),
      new IsContactEmpty()
    );
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
            'Lorem ipsum',
            instance(user)
          )
        )
      )
    ).thenResolve(instance(createdContact));
    when(
      userRepository.findOneById('e470e89e-83a4-46ca-a407-8a3905ae52e9')
    ).thenResolve(instance(user));
    expect(
      await handler.execute(
        new CreateContactCommand(
          'Sarah',
          'Conor',
          'Aperture Science',
          'sarah.conor@aperture.org',
          '0612345678',
          'Lorem ipsum',
          'e470e89e-83a4-46ca-a407-8a3905ae52e9'
        )
      )
    ).toBe('2d5fb4da-12c2-11ea-8d71-362b9e155667');

    verify(userRepository.findOneById('e470e89e-83a4-46ca-a407-8a3905ae52e9')).once();

    verify(
      contactRepository.save(
        deepEqual(
          new Contact(
            'Sarah',
            'Conor',
            'Aperture Science',
            'sarah.conor@aperture.org',
            '0612345678',
            'Lorem ipsum',
            instance(user)
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

  it('testContactCreatedWithoutContactedBySuccessfully', async () => {
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
            'Lorem ipsum',
            null
          )
        )
      )
    ).thenResolve(instance(createdContact));
    when(
      userRepository.findOneById('e470e89e-83a4-46ca-a407-8a3905ae52e9')
    ).thenResolve(instance(user));
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

    verify(userRepository.findOneById(anything())).never();

    verify(
      contactRepository.save(
        deepEqual(
          new Contact(
            'Sarah',
            'Conor',
            'Aperture Science',
            'sarah.conor@aperture.org',
            '0612345678',
            'Lorem ipsum',
            null
          )
        )
      )
    ).once();
    verify(createdContact.getId()).once();
  });

  it('testInvalidUserId', async () => {
    try {
      when(
        userRepository.findOneById('e470e89e-83a4-46ca-a407-8a3905ae52e9')
      ).thenResolve(null);

      await handler.execute(
        new CreateContactCommand(
          'Sarah',
          'Conor',
          'Aperture Science',
          'sarah.conor@aperture.org',
          '0612345678',
          'Lorem ipsum',
          'e470e89e-83a4-46ca-a407-8a3905ae52e9'
        )
      );
    } catch (e) {
      expect(e).toBeInstanceOf(UserNotFoundException);
      expect(e.message).toBe('human_resources.users.errors.not_found');

      verify(userRepository.findOneById('e470e89e-83a4-46ca-a407-8a3905ae52e9')).once();

      verify(contactRepository.save(anything())).never();
      verify(createdContact.getId()).never();
    }
  });

});
