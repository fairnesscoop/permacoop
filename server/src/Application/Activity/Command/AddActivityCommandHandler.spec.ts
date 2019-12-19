import {
  mock,
  instance,
  when,
  verify,
  anything,
  deepEqual,
  anyOfClass
} from 'ts-mockito';
import {TaskRepository} from 'src/Infrastructure/Task/Repository/TaskRepository';
import {ProjectRepository} from 'src/Infrastructure/Project/Repository/ProjectRepository';
import {ActivityRepository} from 'src/Infrastructure/Activity/Repository/ActivityRepository';
import {IsMaximumTimeSpentReached} from 'src/Domain/Activity/Specification/IsMaximumTimeSpentReached';
import {AddActivityCommandHandler} from './AddActivityCommandHandler';
import {AddActivityCommand} from './AddActivityCommand';
import {User} from 'src/Domain/User/User.entity';
import {ProjectNotFoundException} from 'src/Domain/Project/Exception/ProjectNotFoundException';
import {Project} from 'src/Domain/Project/Project.entity';
import {TaskNotFoundException} from 'src/Domain/Task/Exception/TaskNotFoundException';
import {Task} from 'src/Domain/Task/Task.entity';
import {MaximumActivityReachedException} from 'src/Domain/Activity/Exception/MaximumActivityReachedException';
import {Activity} from 'src/Domain/Activity/Activity.entity';

describe('AddActivityCommandHandler', () => {
  let taskRepository: TaskRepository;
  let projectRepository: ProjectRepository;
  let activityRepository: ActivityRepository;
  let isMaximumTimeSpentReached: IsMaximumTimeSpentReached;
  let handler: AddActivityCommandHandler;

  const user = mock(User);
  const project = mock(Project);
  const task = mock(Task);
  const date = new Date();

  const command = new AddActivityCommand(
    instance(user),
    date,
    100,
    '50e624ef-3609-4053-a437-f74844a2d2de',
    'e3fc9666-2932-4dc1-b2b9-d904388293fb',
    'Superkaiser development'
  );

  beforeEach(() => {
    taskRepository = mock(TaskRepository);
    projectRepository = mock(ProjectRepository);
    activityRepository = mock(ActivityRepository);
    taskRepository = mock(TaskRepository);
    isMaximumTimeSpentReached = mock(IsMaximumTimeSpentReached);

    handler = new AddActivityCommandHandler(
      instance(taskRepository),
      instance(projectRepository),
      instance(activityRepository),
      instance(isMaximumTimeSpentReached)
    );
  });

  it('testProjectNotFound', async () => {
    when(
      projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(ProjectNotFoundException);
      expect(e.message).toBe('project.errors.not_found');
      verify(
        projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
      ).once();
      verify(taskRepository.findOneById(anything())).never();
      verify(isMaximumTimeSpentReached.isSatisfiedBy(anything())).never();
      verify(activityRepository.save(anything())).never();
    }
  });

  it('testTaskNotFound', async () => {
    when(
      projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(instance(project));
    when(
      taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(TaskNotFoundException);
      expect(e.message).toBe('task.errors.not_found');
      verify(
        projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
      ).once();
      verify(
        taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
      ).once();
      verify(isMaximumTimeSpentReached.isSatisfiedBy(anything())).never();
      verify(activityRepository.save(anything())).never();
    }
  });

  it('testMaximumTimeSpentReached', async () => {
    const activity = new Activity(
      instance(project),
      instance(task),
      instance(user),
      100,
      anyOfClass(Date),
      'Superkaiser development'
    );

    when(
      projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(instance(project));
    when(
      taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).thenResolve(instance(task));
    when(
      isMaximumTimeSpentReached.isSatisfiedBy(deepEqual(activity))
    ).thenResolve(true);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(MaximumActivityReachedException);
      expect(e.message).toBe('activity.errors.maximum_reached');
      verify(
        projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
      ).once();
      verify(
        taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
      ).once();
      verify(
        isMaximumTimeSpentReached.isSatisfiedBy(deepEqual(activity))
      ).once();
      verify(activityRepository.save(anything())).never();
    }
  });

  it('testAddActivitySuccessfully', async () => {
    const activity = new Activity(
      instance(project),
      instance(task),
      instance(user),
      100,
      anyOfClass(Date),
      'Superkaiser development'
    );
    const savedActivity = mock(Activity);

    when(
      projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).thenResolve(instance(project));
    when(
      taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).thenResolve(instance(task));
    when(
      isMaximumTimeSpentReached.isSatisfiedBy(deepEqual(activity))
    ).thenResolve(false);
    when(savedActivity.getId()).thenReturn(
      'a2eaac9c-a118-4502-bc9f-4dbd3b296e73'
    );
    when(activityRepository.save(deepEqual(activity))).thenResolve(
      instance(savedActivity)
    );

    expect(await handler.execute(command)).toBe(
      'a2eaac9c-a118-4502-bc9f-4dbd3b296e73'
    );

    verify(
      projectRepository.findOneById('50e624ef-3609-4053-a437-f74844a2d2de')
    ).once();
    verify(
      taskRepository.findOneById('e3fc9666-2932-4dc1-b2b9-d904388293fb')
    ).once();
    verify(isMaximumTimeSpentReached.isSatisfiedBy(deepEqual(activity))).once();
    verify(activityRepository.save(deepEqual(activity))).once();
    verify(savedActivity.getId()).once();
  });
});
