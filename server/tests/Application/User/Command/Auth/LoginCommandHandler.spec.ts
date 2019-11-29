import {mock, instance, when, verify, anything} from 'ts-mockito';
import {UserRepository} from 'src/Infrastructure/User/Repository/UserRepository';
import {LoginCommandHandler} from 'src/Application/User/Command/Auth/LoginCommandHandler';
import {EncryptionAdapter} from 'src/Infrastructure/Adapter/EncryptionAdapter';
import {LoginCommand} from 'src/Application/User/Command/Auth/LoginCommand';
import {PasswordNotMatchException} from 'src/Domain/User/Exception/PasswordNotMatchException';
import {UserNotFoundException} from 'src/Domain/User/Exception/UserNotFoundException';
import {User} from 'src/Domain/User/User.entity';
import {AuthenticatedView} from 'src/Application/User/View/Auth/AuthenticatedView';

describe('LoginCommandHandler', () => {
  const email = 'mathieu@fairness.coop';
  const user = new User('Mathieu', 'MARCHOIS', email, 'apiToken', 'hash');
  const command = new LoginCommand();
  command.email = 'mathieu@FAIRNESS.coop';
  command.password = 'plainPassword';

  let userRepository: UserRepository;
  let encryptionAdapter: EncryptionAdapter;
  let commandHandler: LoginCommandHandler;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    encryptionAdapter = mock(EncryptionAdapter);
    commandHandler = new LoginCommandHandler(
      instance(userRepository),
      instance(encryptionAdapter)
    );
  });

  it('testUserNotFound', async () => {
    when(userRepository.findOneByEmail(email)).thenResolve(null);

    try {
      await commandHandler.execute(command);
    } catch (e) {
      expect(e instanceof UserNotFoundException).toBe(true);
      verify(userRepository.findOneByEmail(email)).once();
      verify(encryptionAdapter.compare(anything(), anything())).never();
    }
  });

  it('testPasswordNotMatch', async () => {
    when(encryptionAdapter.compare('hash', 'plainPassword')).thenResolve(false);
    when(userRepository.findOneByEmail(email)).thenResolve(user);

    try {
      await commandHandler.execute(command);
    } catch (e) {
      expect(e instanceof PasswordNotMatchException).toBe(true);
      verify(userRepository.findOneByEmail(email)).once();
      verify(encryptionAdapter.compare('hash', 'plainPassword')).once();
    }
  });

  it('testLoginSuccess', async () => {
    when(userRepository.findOneByEmail(email)).thenResolve(user);
    when(encryptionAdapter.compare('hash', 'plainPassword')).thenResolve(true);

    expect(await commandHandler.execute(command)).toMatchObject(
      new AuthenticatedView('Mathieu', 'MARCHOIS', email, 'apiToken')
    );

    verify(userRepository.findOneByEmail(email)).once();
    verify(encryptionAdapter.compare('hash', 'plainPassword')).once();
  });
});
