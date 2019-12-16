import {mock, instance, when, verify} from 'ts-mockito';
import {UserRepository} from 'src/Infrastructure/User/Repository/UserRepository';
import {User} from 'src/Domain/User/User.entity';
import {UserView} from 'src/Application/User/View/UserView';
import {GetUserByIdQueryHandler} from './GetUserByIdQueryHandler';
import {GetUserByIdQuery} from './GetUserByIdQuery';
import {UserNotFoundException} from 'src/Domain/User/Exception/UserNotFoundException';

describe('GetUserByIdQueryHandler', () => {
  const query = new GetUserByIdQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');

  it('testGetUser', async () => {
    const userRepository = mock(UserRepository);
    const queryHandler = new GetUserByIdQueryHandler(instance(userRepository));

    const user = mock(User);

    when(user.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(user.getFirstName()).thenReturn('Mathieu');
    when(user.getLastName()).thenReturn('MARCHOIS');
    when(user.getEmail()).thenReturn('mathieu@fairness.coop');
    when(
      userRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(user));

    expect(await queryHandler.execute(query)).toMatchObject(
      new UserView(
        'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
        'Mathieu',
        'MARCHOIS',
        'mathieu@fairness.coop'
      )
    );

    verify(
      userRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
    verify(user.getId()).once();
    verify(user.getFirstName()).once();
    verify(user.getLastName()).once();
    verify(user.getEmail()).once();
  });

  it('testGetUserNotFound', async () => {
    const userRepository = mock(UserRepository);
    const queryHandler = new GetUserByIdQueryHandler(instance(userRepository));
    when(
      userRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      await queryHandler.execute(query);
    } catch (e) {
      expect(e).toBeInstanceOf(UserNotFoundException);
      expect(e.message).toBe('user.errors.not_found');
      verify(
        userRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
