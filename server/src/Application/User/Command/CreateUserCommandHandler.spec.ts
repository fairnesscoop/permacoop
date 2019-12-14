import {mock, instance, when, verify, deepEqual} from 'ts-mockito';
import {UserRepository} from 'src/Infrastructure/User/Repository/UserRepository';
import {EncryptionAdapter} from 'src/Infrastructure/Adapter/EncryptionAdapter';
import {CreateUserCommand} from 'src/Application/User/Command/CreateUserCommand';
import {CreateUserCommandHandler} from 'src/Application/User/Command/CreateUserCommandHandler';
import {IsEmailAlreadyExist} from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import {EmailAlreadyExistException} from 'src/Domain/User/Exception/EmailAlreadyExistException';
import {UserView} from 'src/Application/User/View/UserView';
import {User} from 'src/Domain/User/User.entity';

describe('CreatUserCommandHandler', () => {
  const email = 'mathieu@fairness.coop';
  const command = new CreateUserCommand();
  command.email = 'mathieu@FAIRNESS.coop';
  command.firstName = 'Mathieu';
  command.lastName = 'MARCHOIS';
  command.password = 'plainPassword';

  let userRepository: UserRepository;
  let encryptionAdapter: EncryptionAdapter;
  let isEmailAlreadyExist: IsEmailAlreadyExist;
  let commandHandler: CreateUserCommandHandler;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    encryptionAdapter = mock(EncryptionAdapter);
    isEmailAlreadyExist = mock(IsEmailAlreadyExist);

    commandHandler = new CreateUserCommandHandler(
      instance(userRepository),
      instance(encryptionAdapter),
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
      verify(encryptionAdapter.hash('plainPassword')).never();
      verify(
        encryptionAdapter.hash('mathieu@fairness.coopplainPassword')
      ).never();
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
    when(createdUser.getFirstName()).thenReturn('Mathieu');
    when(createdUser.getLastName()).thenReturn('MARCHOIS');
    when(createdUser.getEmail()).thenReturn('mathieu@fairness.coop');
    when(createdUser.getApiToken()).thenReturn('hashToken');
    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(false);
    when(encryptionAdapter.hash(command.password)).thenResolve('hashPassword');
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
    when(encryptionAdapter.hash(email + command.password)).thenResolve(
      'hashToken'
    );

    expect(await commandHandler.execute(command)).toMatchObject(
      new UserView(
        'fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f',
        'Mathieu',
        'MARCHOIS',
        'mathieu@fairness.coop'
      )
    );

    verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
    verify(encryptionAdapter.hash('plainPassword')).once();
    verify(encryptionAdapter.hash('mathieu@fairness.coopplainPassword')).once();
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
  });
});
