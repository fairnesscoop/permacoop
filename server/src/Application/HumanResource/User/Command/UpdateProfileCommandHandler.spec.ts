import {mock, instance, when, verify, anything, anyString} from 'ts-mockito';
import {UserRepository} from 'src/Infrastructure/HumanResource/User/Repository/UserRepository';
import {PasswordEncoderAdapter} from 'src/Infrastructure/Adapter/PasswordEncoderAdapter';
import {IsEmailAlreadyExist} from 'src/Domain/HumanResource/User/Specification/IsEmailAlreadyExist';
import {EmailAlreadyExistException} from 'src/Domain/HumanResource/User/Exception/EmailAlreadyExistException';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {UpdateProfileCommandHandler} from './UpdateProfileCommandHandler';
import {UpdateProfileCommand} from './UpdateProfileCommand';

describe('UpdateProfileCommandHandler', () => {
  const email = 'mathieu@fairness.coop';

  let userRepository: UserRepository;
  let passwordEncoder: PasswordEncoderAdapter;
  let isEmailAlreadyExist: IsEmailAlreadyExist;
  let commandHandler: UpdateProfileCommandHandler;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    passwordEncoder = mock(PasswordEncoderAdapter);
    isEmailAlreadyExist = mock(IsEmailAlreadyExist);

    commandHandler = new UpdateProfileCommandHandler(
      instance(userRepository),
      instance(passwordEncoder),
      instance(isEmailAlreadyExist)
    );
  });

  it('testEmailAlreadyExist', async () => {
    const user = mock(User);
    const command = new UpdateProfileCommand(
      instance(user),
      'Mathieu',
      'Marchois',
      'mathieu@FAIRNESS.coop'
    );

    when(user.getEmail()).thenReturn('mathieu.marchois@fairess.coop');
    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(true);

    try {
      await commandHandler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(EmailAlreadyExistException);
      expect(e.message).toBe('human_resources.users.errors.email_already_exist');
      verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
      verify(passwordEncoder.hash(anything())).never();
      verify(userRepository.save(anything())).never();
    }
  });

  it('testUpdateWithoutPassword', async () => {
    const user = mock(User);
    const command = new UpdateProfileCommand(
      instance(user),
      'Mathieu',
      'Marchois',
      'mathieu@FAIRNESS.coop'
    );

    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(false);

    // Command return nothing
    expect(await commandHandler.execute(command)).toBeUndefined();

    verify(user.update('Mathieu', 'Marchois', 'mathieu@fairness.coop')).once();
    verify(
      user.update('Mathieu', 'Marchois', 'mathieu@fairness.coop')
    ).calledBefore(userRepository.save(instance(user)));
    verify(user.updatePassword(anyString())).never();
    verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
    verify(userRepository.save(instance(user))).once();
  });

  it('testUpdateWithPassword', async () => {
    const user = mock(User);
    const command = new UpdateProfileCommand(
      instance(user),
      'Mathieu',
      'Marchois',
      'mathieu@FAIRNESS.coop',
      'azerty'
    );

    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(false);
    when(passwordEncoder.hash('azerty')).thenResolve('azertyCrypted');

    // Command return nothing
    expect(await commandHandler.execute(command)).toBeUndefined();

    verify(user.update('Mathieu', 'Marchois', 'mathieu@fairness.coop')).once();
    verify(user.updatePassword('azertyCrypted')).once();
    verify(user.updatePassword('azertyCrypted')).calledBefore(
      userRepository.save(instance(user))
    );
    verify(passwordEncoder.hash('azerty')).once();
    verify(
      user.update('Mathieu', 'Marchois', 'mathieu@fairness.coop')
    ).calledBefore(userRepository.save(instance(user)));
    verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
    verify(userRepository.save(instance(user))).once();
  });
});
