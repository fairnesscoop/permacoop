import {mock, instance, when, verify, anyOfClass} from 'ts-mockito';
import {UserRepository} from 'src/Infrastructure/User/Repository/UserRepository';
import {EncryptionAdapter} from 'src/Infrastructure/Adapter/EncryptionAdapter';
import {CreateUserCommand} from 'src/Application/User/Command/CreateUserCommand';
import {CreateUserCommandHandler} from 'src/Application/User/Command/CreateUserCommandHandler';
import {CanRegisterSpecification} from 'src/Domain/User/Specification/CanRegisterSpecification';
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
  let canRegisterSpecification: CanRegisterSpecification;
  let commandHandler: CreateUserCommandHandler;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    encryptionAdapter = mock(EncryptionAdapter);
    canRegisterSpecification = mock(CanRegisterSpecification);

    commandHandler = new CreateUserCommandHandler(
      instance(userRepository),
      instance(encryptionAdapter),
      instance(canRegisterSpecification)
    );
  });

  it('testUserNotFound', async () => {
    when(canRegisterSpecification.isSatisfiedBy(email)).thenResolve(false);

    try {
      await commandHandler.execute(command);
    } catch (e) {
      expect(e instanceof EmailAlreadyExistException).toBe(true);
      verify(canRegisterSpecification.isSatisfiedBy(email)).once();
      verify(encryptionAdapter.hash('plainPassword')).never();
      verify(
        encryptionAdapter.hash('mathieu@fairness.coopplainPassword')
      ).never();
      verify(
        userRepository.save(
          new User(
            'Mathieu',
            'MARCHOIS',
            'mathieu@fairness.coop',
            'hashToken',
            'hashPassword'
          )
        )
      ).never();
    }
  });

  it('testRegisterSuccess', async () => {
    // todo : Temporarly disabled, waiting for ts-mockito issue.
    /*
    const createdUser: User = mock(User);

    when(createdUser.getFirstName()).thenReturn('Mathieu');
    when(createdUser.getLastName()).thenReturn('MARCHOIS');
    when(createdUser.getEmail()).thenReturn('mathieu@fairness.coop');
    when(createdUser.getApiToken()).thenReturn('hashToken');
    when(canRegisterSpecification.isSatisfiedBy(email)).thenResolve(true);
    when(encryptionAdapter.hash(command.password)).thenResolve('hashPassword');
    when(
      userRepository.save(
        new User(
          'Mathieu',
          'MARCHOIS',
          'mathieu@fairness.coop',
          'hashToken',
          'hashPassword'
        )
      )
    ).thenResolve(instance(createdUser));
    when(encryptionAdapter.hash(email + command.password)).thenResolve(
      'hashToken'
    );

    expect(await commandHandler.execute(command)).toMatchObject(
      new UserView(
        'uuid',
        'Mathieu',
        'MARCHOIS',
        'mathieu@fairness.coop'
      )
    );

    verify(canRegisterSpecification.isSatisfiedBy(email)).once();
    verify(encryptionAdapter.hash('plainPassword')).once();
    verify(encryptionAdapter.hash('mathieu@fairness.coopplainPassword')).once();
    verify(userRepository.save(anyOfClass(User))).once();
  */
  });
});
