import {mock, instance, when, verify, anything} from 'ts-mockito';

import {ActivityRepository} from 'src/Infrastructure/Activity/Repository/ActivityRepository';
import {DeleteActivityCommandHandler} from './DeleteActivityCommandHandler';
import {DeleteActivityCommand} from './DeleteActivityCommand';
import {User} from 'src/Domain/User/User.entity';
import {Activity} from 'src/Domain/Activity/Activity.entity';
import {ActivityNotFoundException} from 'src/Domain/Activity/Exception/ActivityNotFoundException';
import {NotActivityOwnerException} from 'src/Domain/Activity/Exception/NotActivityOwnerException';
import {Project} from 'src/Domain/Project/Project.entity';
import {Task} from 'src/Domain/Task/Task.entity';

describe('DeleteActivityCommandHandler', () => {
  let activityRepository: ActivityRepository;
  let handler: DeleteActivityCommandHandler;

  const user = mock(User);
  const otherUser = mock(User);
  const project = mock(Project);
  const task = mock(Task);

  const activity = new Activity(
    instance(project),
    instance(task),
    instance(user),
    1,
    'date',
    'summary'
  );

  const command = new DeleteActivityCommand(
    instance(user),
    '50e624ef-3609-4053-a437-f74844a2d2de'
  );

  beforeEach(() => {
    activityRepository = mock(ActivityRepository);

    handler = new DeleteActivityCommandHandler(instance(activityRepository));
  });

  it('testActivityNotFound', async () => {
    when(
      activityRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(ActivityNotFoundException);
      expect(e.message).toBe('activity.errors.not_found');
      verify(
        activityRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
      ).once();
      verify(activityRepository.deleteById(anything())).never();
    }
  });

  it('testNotActivityOwner', async () => {
    const otherActivity = new Activity(
      instance(project),
      instance(task),
      instance(otherUser),
      1,
      'date',
      'summary'
    );
    when(
      activityRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(otherActivity);
    when(otherUser.getId()).thenReturn('e3fc9666-2932-4dc1-b2b9-d904388293fb');
    when(user.getId()).thenReturn('e3fc9666-2932-4dc1-b2b9-d904388293fc');

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(NotActivityOwnerException);
      expect(e.message).toBe('activity.errors.not_owner');
      verify(
        activityRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
      ).once();
      verify(activityRepository.deleteById(anything())).never();
    }
  });

  it('testDeleteactivity', async () => {
    when(
      activityRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(activity);
    when(user.getId()).thenReturn('e3fc9666-2932-4dc1-b2b9-d904388293fb');

    expect(await handler.execute(command));

    verify(
      activityRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).once();
    verify(
      activityRepository.deleteById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).once();
  });
});
