import {mock, instance, when, verify, deepEqual, anything} from 'ts-mockito';
import {UserRepository} from 'src/Infrastructure/HumanResource/User/Repository/UserRepository';
import {PasswordEncoderAdapter} from 'src/Infrastructure/Adapter/PasswordEncoderAdapter';
import {
  CreateUserCommand,
  IUserAdministrativeCommand
} from 'src/Application/HumanResource/User/Command/CreateUserCommand';
import {CreateUserCommandHandler} from 'src/Application/HumanResource/User/Command/CreateUserCommandHandler';
import {IsEmailAlreadyExist} from 'src/Domain/HumanResource/User/Specification/IsEmailAlreadyExist';
import {EmailAlreadyExistException} from 'src/Domain/HumanResource/User/Exception/EmailAlreadyExistException';
import {User, UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {UserAdministrativeRepository} from 'src/Infrastructure/HumanResource/User/Repository/UserAdministrativeRepository';
import {
  UserAdministrative,
  ContractType
} from 'src/Domain/HumanResource/User/UserAdministrative.entity';
import {UserAdministrativeMissingException} from 'src/Domain/HumanResource/User/Exception/UserAdministrativeMissingException';

describe('CreatUserCommandHandler', () => {
  const email = 'mathieu@fairness.coop';
  const command = new CreateUserCommand(
    'Mathieu',
    'MARCHOIS',
    'mathieu@FAIRNESS.coop',
    'plainPassword',
    UserRole.COOPERATOR
  );
  const admin: IUserAdministrativeCommand = {
    annualEarnings: 50000,
    healthInsurance: true,
    executivePosition: true,
    contract: ContractType.CDI,
    joiningDate: '2018-04-09',
    leavingDate: null,
    transportFee: 75.2
  };
  const userAdministrative = new UserAdministrative(
    5000000,
    true,
    true,
    ContractType.CDI,
    '2018-04-09',
    null,
    7520
  );

  let userRepository: UserRepository;
  let userAdministrativeRepository: UserAdministrativeRepository;
  let passwordEncoder: PasswordEncoderAdapter;
  let isEmailAlreadyExist: IsEmailAlreadyExist;
  let commandHandler: CreateUserCommandHandler;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    userAdministrativeRepository = mock(UserAdministrativeRepository);
    passwordEncoder = mock(PasswordEncoderAdapter);
    isEmailAlreadyExist = mock(IsEmailAlreadyExist);

    commandHandler = new CreateUserCommandHandler(
      instance(userAdministrativeRepository),
      instance(userRepository),
      instance(passwordEncoder),
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
      verify(passwordEncoder.hash('plainPassword')).never();
      verify(
        passwordEncoder.hash('mathieu@fairness.coopplainPassword')
      ).never();
      verify(userRepository.save(anything())).never();
      verify(userAdministrativeRepository.save(anything())).never();
    }
  });

  it('testRegisterSuccess', async () => {
    const command1 = new CreateUserCommand(
      'Mathieu',
      'MARCHOIS',
      'mathieu@FAIRNESS.coop',
      'plainPassword',
      UserRole.COOPERATOR,
      admin
    );
    const createdUserAdministrative: UserAdministrative = mock(
      UserAdministrative
    );
    const createdUser: User = mock(User);

    when(createdUser.getId()).thenReturn(
      'fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'
    );
    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(false);
    when(passwordEncoder.hash(command1.password)).thenResolve('hashPassword');

    when(
      userAdministrativeRepository.save(deepEqual(userAdministrative))
    ).thenResolve(instance(createdUserAdministrative));
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
            instance(createdUserAdministrative)
          )
        )
      )
    ).thenResolve(instance(createdUser));
    when(passwordEncoder.hash(email + command1.password)).thenResolve(
      'hashToken'
    );

    expect(await commandHandler.execute(command1)).toBe(
      'fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'
    );

    verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
    verify(passwordEncoder.hash('plainPassword')).once();
    verify(passwordEncoder.hash('mathieu@fairness.coopplainPassword')).once();
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
            instance(createdUserAdministrative)
          )
        )
      )
    ).once();
    verify(
      userAdministrativeRepository.save(deepEqual(userAdministrative))
    ).once();
    verify(createdUser.getId()).once();
  });

  it('testAccountantRegisterSuccess', async () => {
    const command1 = new CreateUserCommand(
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
    when(passwordEncoder.hash(command1.password)).thenResolve('hashPassword');
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
    when(passwordEncoder.hash(email + command1.password)).thenResolve(
      'hashToken'
    );

    expect(await commandHandler.execute(command1)).toBe(
      'fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'
    );

    verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
    verify(passwordEncoder.hash('plainPassword')).once();
    verify(passwordEncoder.hash('mathieu@fairness.coopplainPassword')).once();
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
    verify(userAdministrativeRepository.save(anything())).never();
    verify(createdUser.getId()).once();
  });

  it('testRegisterAccountantWithUserAdministrativeSuccess', async () => {
    const command1 = new CreateUserCommand(
      'Mathieu',
      'MARCHOIS',
      'mathieu@FAIRNESS.coop',
      'plainPassword',
      UserRole.ACCOUNTANT,
      admin
    );
    const createdUser: User = mock(User);

    when(createdUser.getId()).thenReturn(
      'fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'
    );
    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(false);
    when(passwordEncoder.hash(command1.password)).thenResolve('hashPassword');
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
    when(passwordEncoder.hash(email + command1.password)).thenResolve(
      'hashToken'
    );

    expect(await commandHandler.execute(command1)).toBe(
      'fcf9a99f-0c7b-45ca-b68a-bfd79d73a49f'
    );

    verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
    verify(passwordEncoder.hash('plainPassword')).once();
    verify(passwordEncoder.hash('mathieu@fairness.coopplainPassword')).once();
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
    verify(userAdministrativeRepository.save(anything())).never();
    verify(createdUser.getId()).once();
  });

  it('testMissingUserAdministrative', async () => {
    const command1 = new CreateUserCommand(
      'Mathieu',
      'MARCHOIS',
      'mathieu@FAIRNESS.coop',
      'plainPassword',
      UserRole.COOPERATOR
    );

    when(isEmailAlreadyExist.isSatisfiedBy(email)).thenResolve(false);

    try {
      await commandHandler.execute(command1);
    } catch (e) {
      expect(e).toBeInstanceOf(UserAdministrativeMissingException);
      expect(e.message).toBe('user.errors.user_administrative_missing');
      verify(isEmailAlreadyExist.isSatisfiedBy(email)).once();
      verify(passwordEncoder.hash(anything())).never();
      verify(passwordEncoder.hash(anything())).never();
      verify(userRepository.save(anything())).never();
      verify(userAdministrativeRepository.save(anything())).never();
    }
  });
});
