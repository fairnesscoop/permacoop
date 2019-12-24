import {mock, instance, when, verify} from 'ts-mockito';
import {ActivityRepository} from 'src/Infrastructure/Activity/Repository/ActivityRepository';
import {Activity} from 'src/Domain/Activity/Activity.entity';
import {ActivityView} from 'src/Application/Activity/View/ActivityView';
import {GetActivityByIdQueryHandler} from './GetActivityByIdQueryHandler';
import {GetActivityByIdQuery} from './GetActivityByIdQuery';
import {ActivityNotFoundException} from 'src/Domain/Activity/Exception/ActivityNotFoundException';
import {Task} from 'src/Domain/Task/Task.entity';
import {Project} from 'src/Domain/Project/Project.entity';

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
    const activity = mock(Activity);

    when(activity.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(activity.getTime()).thenReturn(75);
    when(activity.getSummary()).thenReturn('Summary');
    when(activity.getTask()).thenReturn(instance(task));
    when(activity.getProject()).thenReturn(instance(project));
    when(project.getFullName()).thenReturn('Customer > Project');
    when(task.getName()).thenReturn('Development');
    when(
      activityRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(activity));

    expect(await queryHandler.execute(query)).toMatchObject(
      new ActivityView(
        'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
        75,
        'Summary',
        'Customer > Project',
        'Development'
      )
    );

    verify(
      activityRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
    verify(activity.getId()).once();
    verify(activity.getTime()).once();
    verify(activity.getTask()).once();
    verify(activity.getProject()).once();
    verify(project.getFullName()).once();
    verify(task.getName()).once();
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
