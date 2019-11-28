import {mock, instance, when, verify} from 'ts-mockito';
import {UserRepository} from 'src/Infrastructure/User/Repository/UserRepository';
import {CanRegisterSpecification} from 'src/Domain/User/Specification/CanRegisterSpecification';
import {User} from 'src/Domain/User/User.entity';

describe('CanRegisterSpecification', () => {
  const email = 'mathieu@fairness.coop';

  let userRepository: UserRepository;
  let canRegister: CanRegisterSpecification;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    canRegister = new CanRegisterSpecification(instance(userRepository));
  });

  it('testUserCanRegister', async () => {
    when(userRepository.findOneByEmail(email)).thenResolve(null);
    expect(await canRegister.isSatisfiedBy(email)).toBe(true);
    verify(userRepository.findOneByEmail(email)).once();
  });

  it('testUserCannotRegister', async () => {
    when(userRepository.findOneByEmail(email)).thenResolve(new User({email}));
    expect(await canRegister.isSatisfiedBy(email)).toBe(false);
    verify(userRepository.findOneByEmail(email)).once();
  });
});
