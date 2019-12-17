import {mock, instance, when, verify} from 'ts-mockito';
import {ActivityRepository} from 'src/Infrastructure/Project/Repository/ActivityRepository';
import {Activity} from 'src/Domain/Project/Activity.entity';
import {ActivityView} from 'src/Application/Project/View/ActivityView';
import {GetActivityByIdQueryHandler} from './GetActivityByIdQueryHandler';
import {GetActivityByIdQuery} from './GetActivityByIdQuery';
import {ActivityNotFoundException} from 'src/Domain/Project/Exception/ActivityNotFoundException';
import {Task} from 'src/Domain/Task/Task.entity';
import {Project} from 'src/Domain/Project/Project.entity';
import {User} from 'src/Domain/User/User.entity';
import {ProjectView} from '../View/ProjectView';
import {TaskView} from 'src/Application/Task/View/TaskView';

describe('GetActivityByIdQueryHandler', () => {
  const query = new GetActivityByIdQuery(
    'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2'
  );

  it('testGetActivity', async () => {
    const activityRepository = mock(ActivityRepository);
    const queryHandler = new GetActivityByIdQueryHandler(
      instance(activityRepository)
    );

    const task = mock(Task);
    const project = mock(Project);
    const user = mock(User);
    const activity = mock(Activity);
    const date = new Date();

    when(activity.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(activity.getDate()).thenReturn(date);
    when(activity.getTime()).thenReturn(75);
    when(activity.getSummary()).thenReturn('Summary');
    when(activity.getTask()).thenReturn(instance(task));
    when(activity.getProject()).thenReturn(instance(project));
    when(activity.getUser()).thenReturn(instance(user));
    when(project.getId()).thenReturn('b06447a5-0aed-466d-bd5d-61ff7dae872b');
    when(project.getName()).thenReturn('Project');
    when(user.getFullName()).thenReturn('Mathieu MARCHOIS');
    when(task.getId()).thenReturn('549e2057-2086-4809-a33b-a2b470b8e9b7');
    when(task.getName()).thenReturn('Development');
    when(
      activityRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(activity));

    expect(await queryHandler.execute(query)).toMatchObject(
      new ActivityView(
        'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
        date,
        75,
        'Summary',
        'Mathieu MARCHOIS',
        new ProjectView('b06447a5-0aed-466d-bd5d-61ff7dae872b', 'Project'),
        new TaskView('549e2057-2086-4809-a33b-a2b470b8e9b7', 'Development')
      )
    );

    verify(
      activityRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
    verify(activity.getId()).once();
    verify(activity.getDate()).once();
    verify(activity.getTime()).once();
    verify(activity.getTask()).once();
    verify(activity.getProject()).once();
    verify(activity.getUser()).once();
    verify(project.getId()).once();
    verify(project.getName()).once();
    verify(user.getFullName()).once();
    verify(task.getName()).once();
    verify(task.getId()).once();
  });

  it('testGetActivityNotFound', async () => {
    const activityRepository = mock(ActivityRepository);
    const queryHandler = new GetActivityByIdQueryHandler(
      instance(activityRepository)
    );
    when(
      activityRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      await queryHandler.execute(query);
    } catch (e) {
      expect(e).toBeInstanceOf(ActivityNotFoundException);
      expect(e.message).toBe('activity.errors.not_found');
      verify(
        activityRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
