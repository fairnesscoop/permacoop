import {mock, instance, when, verify} from 'ts-mockito';
import {UserRepository} from 'src/Infrastructure/HumanResource/User/Repository/UserRepository';
import {User, UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {UserView} from 'src/Application/HumanResource/User/View/UserView';
import {GetUserByIdQueryHandler} from './GetUserByIdQueryHandler';
import {GetUserByIdQuery} from './GetUserByIdQuery';
import {UserNotFoundException} from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';

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
    when(user.getRole()).thenReturn(UserRole.COOPERATOR);
    when(user.isAdministrativeEditable()).thenReturn(true);
    when(
      userRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(user));

    expect(await queryHandler.execute(query)).toMatchObject(
      new UserView(
        'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
        'Mathieu',
        'MARCHOIS',
        'mathieu@fairness.coop',
        UserRole.COOPERATOR,
        true,
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
      expect(e.message).toBe('human_resources.users.errors.not_found');
      verify(
        userRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
