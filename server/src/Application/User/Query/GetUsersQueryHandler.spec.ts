import {mock, instance, when, verify} from 'ts-mockito';
import {GetUsersQueryHandler} from './GetUsersQueryHandler';
import {UserRepository} from 'src/Infrastructure/User/Repository/UserRepository';
import {GetUsersQuery} from './GetUsersQuery';
import {User} from 'src/Domain/User/User.entity';
import {UserView} from '../View/UserView';

describe('GetUsersQueryHandler', () => {
  it('testGetUsers', async () => {
    const userRepository = mock(UserRepository);

    const user1 = mock(User);
    when(user1.getId()).thenReturn('ae2fd71d-63be-4a27-b94d-213f2cfdb44d');
    when(user1.getFirstName()).thenReturn('Mathieu');
    when(user1.getLastName()).thenReturn('MARCHOIS');
    when(user1.getEmail()).thenReturn('mathieu@fairness.coop');

    const user2 = mock(User);
    when(user2.getId()).thenReturn('0d7fee8a-ce9e-4bff-a93a-9cffafac5f1c');
    when(user2.getFirstName()).thenReturn('Hélène');
    when(user2.getLastName()).thenReturn('MARCHOIS');
    when(user2.getEmail()).thenReturn('helene@fairness.coop');

    when(userRepository.findUsers()).thenResolve([
      instance(user1),
      instance(user2)
    ]);

    const handler = new GetUsersQueryHandler(instance(userRepository));
    const expectedResult = [
      new UserView(
        'ae2fd71d-63be-4a27-b94d-213f2cfdb44d',
        'Mathieu',
        'MARCHOIS',
        'mathieu@fairness.coop'
      ),
      new UserView(
        '0d7fee8a-ce9e-4bff-a93a-9cffafac5f1c',
        'Hélène',
        'MARCHOIS',
        'helene@fairness.coop'
      )
    ];

    expect(await handler.execute(new GetUsersQuery())).toMatchObject(
      expectedResult
    );
    verify(userRepository.findUsers()).once();
  });

  it('testGetEmptyUsers', async () => {
    const userRepository = mock(UserRepository);

    when(userRepository.findUsers()).thenResolve([]);

    const handler = new GetUsersQueryHandler(instance(userRepository));

    expect(await handler.execute(new GetUsersQuery())).toMatchObject([]);
    verify(userRepository.findUsers()).once();
  });
});
