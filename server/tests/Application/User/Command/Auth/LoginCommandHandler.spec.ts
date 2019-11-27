import {mock, instance, when, verify} from 'ts-mockito';
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
  const command = new LoginCommand();
  command.email = email;
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

  it('testUserNotFound', () => {
    when(userRepository.findOneByEmail(email)).thenResolve(null);
    expect(commandHandler.execute(command)).rejects.toThrow(
      UserNotFoundException
    );

    verify(userRepository.findOneByEmail(email)).once();
    // verify(encryptionAdapter.compare(anything(), anything())).never();
  });

  it('testPasswordNotMatch', () => {
    when(userRepository.findOneByEmail(email)).thenResolve(
      new User({email, password: 'hash'})
    );
    when(encryptionAdapter.compare('hash', 'plainPassword')).thenResolve(false);

    const handler = commandHandler.execute(command);
    expect(handler).rejects.toThrow(PasswordNotMatchException);

    verify(userRepository.findOneByEmail(email)).once();
    //verify(encryptionAdapter.compare('hash', 'plainPassword')).once();
  });

  it('testLoginSuccess', () => {
    const user = new User({
      firstName: 'Mathieu',
      lastName: 'MARCHOIS',
      email,
      apiToken: 'apiToken',
      password: 'hash'
    });

    when(userRepository.findOneByEmail(email)).thenResolve(user);
    when(encryptionAdapter.compare('hash', 'plainPassword')).thenResolve(true);

    expect(commandHandler.execute(command)).resolves.toMatchObject(
      new AuthenticatedView('Mathieu', 'MARCHOIS', email, 'apiToken')
    );

    verify(userRepository.findOneByEmail(email)).once();
    //verify(encryptionAdapter.compare('hash', 'plainPassword')).once();
  });
});
