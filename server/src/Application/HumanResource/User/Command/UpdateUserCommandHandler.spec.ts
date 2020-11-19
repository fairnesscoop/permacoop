import {UserNotFoundException} from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';
import {IUserAdministrativeRepository} from 'src/Domain/HumanResource/User/Repository/IUserAdministrativeRepository';
import {IUserRepository} from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import {User, UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {ContractType, UserAdministrative} from 'src/Domain/HumanResource/User/UserAdministrative.entity';
import {UserAdministrativeRepository} from 'src/Infrastructure/HumanResource/User/Repository/UserAdministrativeRepository';
import {UserRepository} from 'src/Infrastructure/HumanResource/User/Repository/UserRepository';
import {anything, deepEqual, instance, mock, verify, when} from 'ts-mockito';

import {UpdateUserCommand} from './UpdateUserCommand';
import {UpdateUserCommandHandler} from './UpdateUserCommandHandler';

describe('UpdateProfileCommandHandler', () => {
  let userRepository: IUserRepository;
  let userAdministrativeRepository: IUserAdministrativeRepository;
  let commandHandler: UpdateUserCommandHandler;

  const command: UpdateUserCommand = new UpdateUserCommand(
    'c07c4d56-5ff1-4ef9-b38e-631a6b9e92ed',
    UserRole.COOPERATOR,
    50000,
    ContractType.CDI,
    true,
    true,
    '2018-01-01',
    null,
    75.2
  );

  beforeEach(() => {
    userRepository = mock(UserRepository);
    userAdministrativeRepository = mock(UserAdministrativeRepository);

    commandHandler = new UpdateUserCommandHandler(instance(userRepository), instance(userAdministrativeRepository));
  });

  it('testUserNotFound', async () => {
    const user = mock(User);

    when(userRepository.findOneById('c07c4d56-5ff1-4ef9-b38e-631a6b9e92ed')).thenResolve(null);

    try {
      await commandHandler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(UserNotFoundException);
      expect(e.message).toBe('human_resources.users.errors.not_found');
      verify(userRepository.findOneById('c07c4d56-5ff1-4ef9-b38e-631a6b9e92ed')).once();
      verify(userRepository.save(anything())).never();
      verify(userAdministrativeRepository.save(anything())).never();
    }
  });

  it('testUserUpdated', async () => {
    const userAdministrative = new UserAdministrative(30000, false, false, ContractType.CTT, '2017-08-01', '2018-12-31', null);
    const user = new User('John', 'Doe', 'john@email.com', '123456789', 'password', UserRole.EMPLOYEE, userAdministrative);

    when(userRepository.findOneById('c07c4d56-5ff1-4ef9-b38e-631a6b9e92ed')).thenResolve(user);
    when(userAdministrativeRepository.findOneByUserId('c07c4d56-5ff1-4ef9-b38e-631a6b9e92ed')).thenResolve(userAdministrative);

    await commandHandler.execute(command);
    const updatedUserAdministrative = new UserAdministrative(
      5000000,
      true,
      true,
      ContractType.CDI,
      '2018-01-01',
      null,
      7520
    );
    verify(userRepository.save(
      deepEqual(new User(
          'John', 'Doe', 'john@email.com', '123456789', 'password', UserRole.COOPERATOR, updatedUserAdministrative
        )
      )
    )).once();
    verify(userAdministrativeRepository.save(deepEqual(updatedUserAdministrative))).once();
  });
});
