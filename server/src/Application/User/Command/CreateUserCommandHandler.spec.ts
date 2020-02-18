import {mock, instance, when, verify, deepEqual} from 'ts-mockito';
import {UserRepository} from 'src/Infrastructure/User/Repository/UserRepository';
import {EncryptionAdapter} from 'src/Infrastructure/Adapter/EncryptionAdapter';
import {CreateUserCommand} from 'src/Application/User/Command/CreateUserCommand';
import {CreateUserCommandHandler} from 'src/Application/User/Command/CreateUserCommandHandler';
import {IsEmailAlreadyExist} from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import {EmailAlreadyExistException} from 'src/Domain/User/Exception/EmailAlreadyExistException';
import {User} from 'src/Domain/User/User.entity';

describe('CreatUserCommandHandler', () => {
  const email = 'mathieu@fairness.coop';
  const command = new CreateUserCommand(
    'Mathieu',
    'MARCHOIS',
    'mathieu@FAIRNESS.coop',
    'plainPassword'
  );

  let userRepository: UserRepository;
  let encryption: EncryptionAdapter;
  let isEmailAlreadyExist: IsEmailAlreadyExist;
  let commandHandler: CreateUserCommandHandler;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    encryption = mock(EncryptionAdapter);
    isEmailAlreadyExist = mock(IsEmailAlreadyExist);

    commandHandler = new CreateUserCommandHandler(
      instance(userRepository),
      instance(encryption),
      instance(isEmailAlreadyExist)
    );
  });

  it('testEmailAlreadyExist', async () => {
    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(true);

    try {
      await commandHandler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(EmailAlreadyExistException);
      expect(e.message).toBe('user.errors.email_already_exist');
      verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
      verify(encryption.hash('plainPassword')).never();
      verify(encryption.hash('mathieu@fairness.coopplainPassword')).never();
      verify(
        userRepository.save(
          deepEqual(
            new User(
              'Mathieu',
              'MARCHOIS',
              'mathieu@fairness.coop',
              'hashToken',
              'hashPassword'
            )
          )
        )
      ).never();
    }
  });

  it('testRegisterSuccess', async () => {
    const createdUser: User = mock(User);

    when(createdUser.getId()).thenReturn(
      'fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'
    );
    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(false);
    when(encryption.hash(command.password)).thenResolve('hashPassword');
    when(
      userRepository.save(
        deepEqual(
          new User(
            'Mathieu',
            'MARCHOIS',
            'mathieu@fairness.coop',
            'hashToken',
            'hashPassword'
          )
        )
      )
    ).thenResolve(instance(createdUser));
    when(encryption.hash(email + command.password)).thenResolve('hashToken');

    expect(await commandHandler.execute(command)).toBe(
      'fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'
    );

    verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
    verify(encryption.hash('plainPassword')).once();
    verify(encryption.hash('mathieu@fairness.coopplainPassword')).once();
    verify(
      userRepository.save(
        deepEqual(
          new User(
            'Mathieu',
            'MARCHOIS',
            'mathieu@fairness.coop',
            'hashToken',
            'hashPassword'
          )
        )
      )
    ).once();
    verify(createdUser.getId()).once();
  });
});
