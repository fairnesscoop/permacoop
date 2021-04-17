import { mock, instance, when, verify, anything } from 'ts-mockito';
import { UserRepository } from 'src/Infrastructure/HumanResource/User/Repository/UserRepository';
import { LoginQueryHandler } from 'src/Application/HumanResource/User/Query/LoginQueryHandler';
import { PasswordEncoderAdapter } from 'src/Infrastructure/Adapter/PasswordEncoderAdapter';
import { LoginQuery } from 'src/Application/HumanResource/User/Query/LoginQuery';
import { PasswordNotMatchException } from 'src/Domain/HumanResource/User/Exception/PasswordNotMatchException';
import { UserNotFoundException } from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';
import { User, UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { AuthenticatedView } from 'src/Application/HumanResource/User/View/AuthenticatedView';

describe('LoginQueryHandler', () => {
  const email = 'mathieu@fairness.coop';
  const query = new LoginQuery('mathieu@FAIRNESS.coop', 'plainPassword');

  let userRepository: UserRepository;
  let passwordEncoder: PasswordEncoderAdapter;
  let queryHandler: LoginQueryHandler;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    passwordEncoder = mock(PasswordEncoderAdapter);
    queryHandler = new LoginQueryHandler(
      instance(userRepository),
      instance(passwordEncoder)
    );
  });

  it('testUserNotFound', async () => {
    when(userRepository.findOneByEmail(email)).thenResolve(null);

    try {
      await queryHandler.execute(query);
    } catch (e) {
      expect(e instanceof UserNotFoundException).toBe(true);
      verify(userRepository.findOneByEmail(email)).once();
      verify(passwordEncoder.compare(anything(), anything())).never();
    }
  });

  it('testPasswordNotMatch', async () => {
    const user = mock(User);
    when(passwordEncoder.compare('hash', 'plainPassword')).thenResolve(false);
    when(userRepository.findOneByEmail(email)).thenResolve(instance(user));
    when(user.getPassword()).thenReturn('hash');

    try {
      await queryHandler.execute(query);
    } catch (e) {
      expect(e instanceof PasswordNotMatchException).toBe(true);
      verify(userRepository.findOneByEmail(email)).once();
      verify(passwordEncoder.compare('hash', 'plainPassword')).once();
      verify(user.getPassword()).once();
    }
  });

  it('testLoginSuccess', async () => {
    const user = mock(User);
    when(userRepository.findOneByEmail(email)).thenResolve(instance(user));
    when(passwordEncoder.compare('hash', 'plainPassword')).thenResolve(true);
    when(user.getId()).thenReturn('14984335-f5aa-402a-a170-5393bb954538');
    when(user.getFirstName()).thenReturn('Mathieu');
    when(user.getLastName()).thenReturn('MARCHOIS');
    when(user.getEmail()).thenReturn(email);
    when(user.getPassword()).thenReturn('hash');
    when(user.getApiToken()).thenReturn('apiToken');
    when(user.getRole()).thenReturn(UserRole.COOPERATOR);

    expect(await queryHandler.execute(query)).toMatchObject(
      new AuthenticatedView(
        '14984335-f5aa-402a-a170-5393bb954538',
        'Mathieu',
        'MARCHOIS',
        email,
        UserRole.COOPERATOR,
        'apiToken'
      )
    );

    verify(userRepository.findOneByEmail(email)).once();
    verify(passwordEncoder.compare('hash', 'plainPassword')).once();
    verify(user.getId()).once();
    verify(user.getFirstName()).once();
    verify(user.getLastName()).once();
    verify(user.getEmail()).once();
    verify(user.getPassword()).once();
    verify(user.getApiToken()).once();
    verify(user.getRole()).once();
  });
});
