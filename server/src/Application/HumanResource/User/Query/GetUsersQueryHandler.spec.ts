import {mock, instance, when, verify} from 'ts-mockito';
import {GetUsersQueryHandler} from './GetUsersQueryHandler';
import {UserRepository} from 'src/Infrastructure/HumanResource/User/Repository/UserRepository';
import {GetUsersQuery} from './GetUsersQuery';
import {User, UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {UserView} from '../View/UserView';

describe('GetUsersQueryHandler', () => {
  it('testGetUsers', async () => {
    const userRepository = mock(UserRepository);

    const user1 = mock(User);
    when(user1.getId()).thenReturn('ae2fd71d-63be-4a27-b94d-213f2cfdb44d');
    when(user1.getFirstName()).thenReturn('Mathieu');
    when(user1.getLastName()).thenReturn('MARCHOIS');
    when(user1.getEmail()).thenReturn('mathieu@fairness.coop');
    when(user1.getRole()).thenReturn(UserRole.COOPERATOR);
    when(user1.getEntryDate()).thenReturn('2019-09-19');

    const user2 = mock(User);
    when(user2.getId()).thenReturn('0d7fee8a-ce9e-4bff-a93a-9cffafac5f1c');
    when(user2.getFirstName()).thenReturn('Hélène');
    when(user2.getLastName()).thenReturn('MARCHOIS');
    when(user2.getEmail()).thenReturn('helene@fairness.coop');
    when(user2.getRole()).thenReturn(UserRole.COOPERATOR);
    when(user2.getEntryDate()).thenReturn('2019-09-19');

    when(userRepository.findUsers(true)).thenResolve([
      instance(user1),
      instance(user2)
    ]);

    const handler = new GetUsersQueryHandler(instance(userRepository));
    const expectedResult = [
      new UserView(
        'ae2fd71d-63be-4a27-b94d-213f2cfdb44d',
        'Mathieu',
        'MARCHOIS',
        'mathieu@fairness.coop',
        UserRole.COOPERATOR,
        '2019-09-19'
      ),
      new UserView(
        '0d7fee8a-ce9e-4bff-a93a-9cffafac5f1c',
        'Hélène',
        'MARCHOIS',
        'helene@fairness.coop',
        UserRole.COOPERATOR,
        '2019-09-19'
      )
    ];

    expect(await handler.execute(new GetUsersQuery(true))).toMatchObject(
      expectedResult
    );
    verify(userRepository.findUsers(true)).once();
  });

  it('testGetEmptyUsers', async () => {
    const userRepository = mock(UserRepository);

    when(userRepository.findUsers(false)).thenResolve([]);

    const handler = new GetUsersQueryHandler(instance(userRepository));

    expect(await handler.execute(new GetUsersQuery(false))).toMatchObject([]);
    verify(userRepository.findUsers(false)).once();
  });
});
