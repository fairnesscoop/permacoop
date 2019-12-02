import {mock, instance, when, verify, anyOfClass} from 'ts-mockito';
import {UserRepository} from 'src/Infrastructure/User/Repository/UserRepository';
import {EncryptionAdapter} from 'src/Infrastructure/Adapter/EncryptionAdapter';
import {RegisterCommand} from 'src/Application/User/Command/Auth/RegisterCommand';
import {RegisterCommandHandler} from 'src/Application/User/Command/Auth/RegisterCommandHandler';
import {CanRegisterSpecification} from 'src/Domain/User/Specification/CanRegisterSpecification';
import {EmailAlreadyExistException} from 'src/Domain/User/Exception/EmailAlreadyExistException';
import {AuthenticatedView} from 'src/Application/User/View/AuthenticatedView';
import {User} from 'src/Domain/User/User.entity';

describe('RegisterCommandHandler', () => {
  const email = 'mathieu@fairness.coop';
  const command = new RegisterCommand();
  command.email = 'mathieu@FAIRNESS.coop';
  command.firstName = 'Mathieu';
  command.lastName = 'MARCHOIS';
  command.password = 'plainPassword';

  let userRepository: UserRepository;
  let encryptionAdapter: EncryptionAdapter;
  let canRegisterSpecification: CanRegisterSpecification;
  let commandHandler: RegisterCommandHandler;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    encryptionAdapter = mock(EncryptionAdapter);
    canRegisterSpecification = mock(CanRegisterSpecification);

    commandHandler = new RegisterCommandHandler(
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
      new AuthenticatedView(
        'Mathieu',
        'MARCHOIS',
        'mathieu@fairness.coop',
        'hashToken'
      )
    );

    verify(canRegisterSpecification.isSatisfiedBy(email)).once();
    verify(encryptionAdapter.hash('plainPassword')).once();
    verify(encryptionAdapter.hash('mathieu@fairness.coopplainPassword')).once();
    verify(userRepository.save(anyOfClass(User))).once();
  */
  });
});
