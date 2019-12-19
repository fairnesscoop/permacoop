import {mock, instance, when, verify} from 'ts-mockito';
import {GetProjectsQueryHandler} from 'src/Application/Project/Query/GetProjectsQueryHandler';
import {ProjectRepository} from 'src/Infrastructure/Project/Repository/ProjectRepository';
import {GetProjectsQuery} from 'src/Application/Project/Query/GetProjectsQuery';
import {Project} from 'src/Domain/Project/Project.entity';
import {Activity} from 'src/Domain/Activity/Activity.entity';
import {User} from 'src/Domain/User/User.entity';
import {Task} from 'src/Domain/Task/Task.entity';
import {GetActivitiesByUserIdAndMonthHandler} from './GetActivitiesByUserIdAndMonthHandler';
import {ActivityRepository} from 'src/Infrastructure/Activity/Repository/ActivityRepository';
import {GetActivitiesByUserIdAndMonth} from './GetActivitiesByUserIdAndMonth';
import {ActivityView} from '../View/ActivityView';
import {ProjectView} from 'src/Application/Project/View/ProjectView';
import {TaskView} from 'src/Application/Task/View/TaskView';

describe('GetActivitiesByUserIdAndMonthHandler', () => {
  it('testGetActivities', async () => {
    const activityRepository = mock(ActivityRepository);
    const date = new Date();
    const task = mock(Task);
    const project = mock(Project);
    const user = mock(User);

    when(project.getId()).thenReturn('b06447a5-0aed-466d-bd5d-61ff7dae872b');
    when(project.getName()).thenReturn('Project');
    when(user.getFullName()).thenReturn('Mathieu MARCHOIS');
    when(task.getId()).thenReturn('549e2057-2086-4809-a33b-a2b470b8e9b7');
    when(task.getName()).thenReturn('Development');

    const activity1 = mock(Activity);
    when(activity1.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(activity1.getDate()).thenReturn(date);
    when(activity1.getTime()).thenReturn(75);
    when(activity1.getSummary()).thenReturn('Summary');
    when(activity1.getTask()).thenReturn(instance(task));
    when(activity1.getProject()).thenReturn(instance(project));
    when(activity1.getUser()).thenReturn(instance(user));

    const activity2 = mock(Activity);
    when(activity2.getId()).thenReturn('b9a9b094-5bb2-4d0b-b01e-231b6cb50039');
    when(activity2.getDate()).thenReturn(date);
    when(activity2.getTime()).thenReturn(25);
    when(activity2.getSummary()).thenReturn('');
    when(activity2.getTask()).thenReturn(instance(task));
    when(activity2.getProject()).thenReturn(instance(project));
    when(activity2.getUser()).thenReturn(instance(user));

    when(
      activityRepository.findByUserIdAndMonth(
        '00bef1e1-cb52-4914-8887-568b17d99964',
        date
      )
    ).thenResolve([instance(activity1), instance(activity2)]);

    const queryHandler = new GetActivitiesByUserIdAndMonthHandler(
      instance(activityRepository)
    );

    const expectedResult = [
      new ActivityView(
        'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
        date,
        75,
        'Summary',
        'Mathieu MARCHOIS',
        new ProjectView('b06447a5-0aed-466d-bd5d-61ff7dae872b', 'Project'),
        new TaskView('549e2057-2086-4809-a33b-a2b470b8e9b7', 'Development')
      ),
      new ActivityView(
        'b9a9b094-5bb2-4d0b-b01e-231b6cb50039',
        date,
        25,
        '',
        'Mathieu MARCHOIS',
        new ProjectView('b06447a5-0aed-466d-bd5d-61ff7dae872b', 'Project'),
        new TaskView('549e2057-2086-4809-a33b-a2b470b8e9b7', 'Development')
      )
    ];

    expect(
      await queryHandler.execute(
        new GetActivitiesByUserIdAndMonth(
          '00bef1e1-cb52-4914-8887-568b17d99964',
          date
        )
      )
    ).toMatchObject(expectedResult);
    verify(
      activityRepository.findByUserIdAndMonth(
        '00bef1e1-cb52-4914-8887-568b17d99964',
        date
      )
    ).once();
  });

  it('testGetEmptyActivities', async () => {
    const activityRepository = mock(ActivityRepository);
    const date = new Date();

    when(
      activityRepository.findByUserIdAndMonth(
        '00bef1e1-cb52-4914-8887-568b17d99964',
        date
      )
    ).thenResolve([]);

    const queryHandler = new GetActivitiesByUserIdAndMonthHandler(
      instance(activityRepository)
    );
    expect(
      await queryHandler.execute(
        new GetActivitiesByUserIdAndMonth(
          '00bef1e1-cb52-4914-8887-568b17d99964',
          date
        )
      )
    ).toMatchObject([]);
    verify(
      activityRepository.findByUserIdAndMonth(
        '00bef1e1-cb52-4914-8887-568b17d99964',
        date
      )
    ).once();
  });
});
