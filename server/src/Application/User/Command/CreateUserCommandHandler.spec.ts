import {mock, instance, when, verify, deepEqual, anything} from 'ts-mockito';
import {UserRepository} from 'src/Infrastructure/User/Repository/UserRepository';
import {EncryptionAdapter} from 'src/Infrastructure/Adapter/EncryptionAdapter';
import {CreateUserCommand} from 'src/Application/User/Command/CreateUserCommand';
import {CreateUserCommandHandler} from 'src/Application/User/Command/CreateUserCommandHandler';
import {IsEmailAlreadyExist} from 'src/Domain/User/Specification/IsEmailAlreadyExist';
import {EmailAlreadyExistException} from 'src/Domain/User/Exception/EmailAlreadyExistException';
import {User, UserRole} from 'src/Domain/User/User.entity';
import {DateUtilsAdapter} from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import {EntryDateMissingException} from 'src/Domain/User/Exception/EntryDateMissingException';

describe('CreatUserCommandHandler', () => {
  const email = 'mathieu@fairness.coop';
  const command = new CreateUserCommand(
    'Mathieu',
    'MARCHOIS',
    'mathieu@FAIRNESS.coop',
    'plainPassword',
    UserRole.COOPERATOR,
    new Date('2019-09-12')
  );

  let userRepository: UserRepository;
  let encryption: EncryptionAdapter;
  let dateUtilsAdapter: DateUtilsAdapter;
  let isEmailAlreadyExist: IsEmailAlreadyExist;
  let commandHandler: CreateUserCommandHandler;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    encryption = mock(EncryptionAdapter);
    dateUtilsAdapter = mock(DateUtilsAdapter);
    isEmailAlreadyExist = mock(IsEmailAlreadyExist);

    commandHandler = new CreateUserCommandHandler(
      instance(userRepository),
      instance(encryption),
      instance(dateUtilsAdapter),
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
      verify(dateUtilsAdapter.format(anything(), anything())).never();
      verify(encryption.hash('mathieu@fairness.coopplainPassword')).never();
      verify(
        userRepository.save(
          deepEqual(
            new User(
              'Mathieu',
              'MARCHOIS',
              'mathieu@fairness.coop',
              'hashToken',
              'hashPassword',
              UserRole.COOPERATOR,
              '2019-09-12'
            )
          )
        )
      ).never();
    }
  });

  it('testCooperatorEntryDateMissing', async () => {
    const command3 = new CreateUserCommand(
      'Mathieu',
      'MARCHOIS',
      'mathieu@FAIRNESS.coop',
      'plainPassword',
      UserRole.COOPERATOR
    );
    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(false);

    try {
      await commandHandler.execute(command3);
    } catch (e) {
      expect(e).toBeInstanceOf(EntryDateMissingException);
      expect(e.message).toBe('user.errors.entry_date_missing');
      verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
      verify(encryption.hash('plainPassword')).never();
      verify(dateUtilsAdapter.format(anything(), anything())).never();
      verify(encryption.hash('mathieu@fairness.coopplainPassword')).never();
      verify(
        userRepository.save(
          deepEqual(
            new User(
              'Mathieu',
              'MARCHOIS',
              'mathieu@fairness.coop',
              'hashToken',
              'hashPassword',
              UserRole.COOPERATOR
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
      dateUtilsAdapter.format(deepEqual(new Date('2019-09-12')), 'y-MM-dd')
    ).thenReturn('2019-09-12');
    when(
      userRepository.save(
        deepEqual(
          new User(
            'Mathieu',
            'MARCHOIS',
            'mathieu@fairness.coop',
            'hashToken',
            'hashPassword',
            UserRole.COOPERATOR,
            '2019-09-12'
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
    verify(
      dateUtilsAdapter.format(deepEqual(new Date('2019-09-12')), 'y-MM-dd')
    ).once();
    verify(encryption.hash('mathieu@fairness.coopplainPassword')).once();
    verify(
      userRepository.save(
        deepEqual(
          new User(
            'Mathieu',
            'MARCHOIS',
            'mathieu@fairness.coop',
            'hashToken',
            'hashPassword',
            UserRole.COOPERATOR,
            '2019-09-12'
          )
        )
      )
    ).once();
    verify(createdUser.getId()).once();
  });

  it('testRegisterWithoutEntryDateSuccess', async () => {
    const command2 = new CreateUserCommand(
      'Mathieu',
      'MARCHOIS',
      'mathieu@FAIRNESS.coop',
      'plainPassword',
      UserRole.ACCOUNTANT
    );
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
            'hashPassword',
            UserRole.ACCOUNTANT,
            null
          )
        )
      )
    ).thenResolve(instance(createdUser));
    when(encryption.hash(email + command.password)).thenResolve('hashToken');

    expect(await commandHandler.execute(command2)).toBe(
      'fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'
    );

    verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
    verify(encryption.hash('plainPassword')).once();
    verify(dateUtilsAdapter.format(anything(), anything())).never();
    verify(encryption.hash('mathieu@fairness.coopplainPassword')).once();
    verify(
      userRepository.save(
        deepEqual(
          new User(
            'Mathieu',
            'MARCHOIS',
            'mathieu@fairness.coop',
            'hashToken',
            'hashPassword',
            UserRole.ACCOUNTANT,
            null
          )
        )
      )
    ).once();
    verify(createdUser.getId()).once();
  });
});
