import {mock, instance, when, verify} from 'ts-mockito';
import {UserRepository} from 'src/Infrastructure/HumanResource/User/Repository/UserRepository';
import {IsEmailAlreadyExist} from 'src/Domain/HumanResource/User/Specification/IsEmailAlreadyExist';
import {User, UserRole} from 'src/Domain/HumanResource/User/User.entity';

describe('IsEmailAlreadyExist', () => {
  const email = 'mathieu@fairness.coop';

  let userRepository: UserRepository;
  let isEmailAlreadyExist: IsEmailAlreadyExist;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    isEmailAlreadyExist = new IsEmailAlreadyExist(instance(userRepository));
  });

  it('testUserCanRegister', async () => {
    when(userRepository.findOneByEmail(email)).thenResolve(null);
    expect(await isEmailAlreadyExist.isSatisfiedBy(email)).toBe(false);
    verify(userRepository.findOneByEmail(email)).once();
  });

  it('testUserCannotRegister', async () => {
    when(userRepository.findOneByEmail(email)).thenResolve(
      new User(
        'Mathieu',
        'MARCHOIS',
        email,
        'token',
        'password',
        UserRole.COOPERATOR
      )
    );
    expect(await isEmailAlreadyExist.isSatisfiedBy(email)).toBe(true);
    verify(userRepository.findOneByEmail(email)).once();
  });
});
