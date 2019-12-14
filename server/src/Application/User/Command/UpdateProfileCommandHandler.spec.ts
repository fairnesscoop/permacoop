import {mock, instance, when, verify, anything, anyString} from 'ts-mockito';
import {UserRepository} from 'src/Infrastructure/User/Repository/UserRepository';
import {EncryptionAdapter} from 'src/Infrastructure/Adapter/EncryptionAdapter';
import {IsEmailAlreadyExist} from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import {EmailAlreadyExistException} from 'src/Domain/User/Exception/EmailAlreadyExistException';
import {UserView} from 'src/Application/User/View/UserView';
import {User} from 'src/Domain/User/User.entity';
import {UpdateProfileCommandHandler} from './UpdateProfileCommandHandler';
import {UpdateProfileCommand} from './UpdateProfileCommand';

describe('UpdateProfileCommandHandler', () => {
  const email = 'mathieu@fairness.coop';

  let userRepository: UserRepository;
  let encryptionAdapter: EncryptionAdapter;
  let isEmailAlreadyExist: IsEmailAlreadyExist;
  let commandHandler: UpdateProfileCommandHandler;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    encryptionAdapter = mock(EncryptionAdapter);
    isEmailAlreadyExist = mock(IsEmailAlreadyExist);

    commandHandler = new UpdateProfileCommandHandler(
      instance(userRepository),
      instance(encryptionAdapter),
      instance(isEmailAlreadyExist)
    );
  });

  it('testEmailAlreadyExist', async () => {
    const user = mock(User);
    const command = new UpdateProfileCommand();
    command.email = 'mathieu@FAIRNESS.coop';
    command.firstName = 'Mathieu';
    command.lastName = 'MARCHOIS';
    command.user = instance(user);

    when(user.getEmail()).thenReturn('mathieu.marchois@fairess.coop');
    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(true);

    try {
      await commandHandler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(EmailAlreadyExistException);
      expect(e.message).toBe('user.errors.email_already_exist');
      verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
      verify(encryptionAdapter.hash(anything())).never();
      verify(userRepository.save(anything())).never();
    }
  });

  it('testUpdateWithoutPassword', async () => {
    const user = mock(User);
    const command = new UpdateProfileCommand();
    command.email = 'mathieu@FAIRNESS.coop';
    command.firstName = 'Mathieu';
    command.lastName = 'Marchois';
    command.user = instance(user);

    when(user.getId()).thenReturn('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f');
    when(user.getFirstName()).thenReturn('Mathieu');
    when(user.getLastName()).thenReturn('Marchois');
    when(user.getEmail()).thenReturn('mathieu.marchois@fairness.coop');
    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(false);

    expect(await commandHandler.execute(command)).toMatchObject(
      new UserView(
        'fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f',
        'Mathieu',
        anyString(),
        anyString()
      )
    );

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
    const command = new UpdateProfileCommand();
    command.email = 'mathieu@FAIRNESS.coop';
    command.firstName = 'Mathieu';
    command.lastName = 'Marchois';
    command.password = 'azerty';
    command.user = instance(user);

    when(user.getId()).thenReturn('fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f');
    when(user.getFirstName()).thenReturn('Mathieu');
    when(user.getLastName()).thenReturn('Marchois');
    when(user.getEmail()).thenReturn('mathieu.marchois@fairness.coop');
    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(false);
    when(encryptionAdapter.hash('azerty')).thenResolve('azertyCrypted');

    expect(await commandHandler.execute(command)).toMatchObject(
      new UserView(
        'fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f',
        'Mathieu',
        anyString(),
        anyString()
      )
    );

    verify(user.update('Mathieu', 'Marchois', 'mathieu@fairness.coop')).once();
    verify(user.updatePassword('azertyCrypted')).once();
    verify(user.updatePassword('azertyCrypted')).calledBefore(
      userRepository.save(instance(user))
    );
    verify(encryptionAdapter.hash('azerty')).once();
    verify(
      user.update('Mathieu', 'Marchois', 'mathieu@fairness.coop')
    ).calledBefore(userRepository.save(instance(user)));
    verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
    verify(userRepository.save(instance(user))).once();
  });
});
