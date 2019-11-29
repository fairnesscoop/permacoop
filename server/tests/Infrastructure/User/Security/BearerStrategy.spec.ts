import {mock, instance, verify, when} from 'ts-mockito';
import {UnauthorizedException} from '@nestjs/common';
import {UserRepository} from 'src/Infrastructure/User/Repository/UserRepository';
import {BearerStrategy} from 'src/Infrastructure/User/Security/BearerStrategy';
import {User} from 'src/Domain/User/User.entity';

describe('BearerStrategy', () => {
  let bearerStrategy: BearerStrategy;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = mock(UserRepository);
    bearerStrategy = new BearerStrategy(instance(userRepository));
  });

  it('testUserNotFound', async () => {
    when(userRepository.findOneByApiToken('apiToken')).thenResolve(undefined);

    try {
      await bearerStrategy.validate('apiToken');
    } catch (e) {
      expect(e instanceof UnauthorizedException).toBe(true);
      verify(userRepository.findOneByApiToken('apiToken')).once();
    }
  });

  it('testUserFound', async () => {
    const user = mock(User);

    when(userRepository.findOneByApiToken('apiToken')).thenResolve(
      instance(user)
    );
    expect(await bearerStrategy.validate('apiToken')).toBeInstanceOf(User);
    verify(userRepository.findOneByApiToken('apiToken')).once();
  });
});
