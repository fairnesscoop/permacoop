import {mock, instance, when, verify} from 'ts-mockito';
import {TaskRepository} from 'src/Infrastructure/Project/Repository/TaskRepository';
import {IsTaskAlreadyExist} from 'src/Domain/Project/Specification/IsTaskAlreadyExist';
import {Task} from 'src/Domain/Project/Task.entity';

describe('IsTaskAlreadyExist', () => {
  let taskRepository: TaskRepository;
  let isTaskAlreadyExist: IsTaskAlreadyExist;

  beforeEach(() => {
    taskRepository = mock(TaskRepository);
    isTaskAlreadyExist = new IsTaskAlreadyExist(instance(taskRepository));
  });

  it('testTaskAlreadyExist', async () => {
    when(taskRepository.findOneByName('Task')).thenResolve(new Task('Task'));
    expect(await isTaskAlreadyExist.isSatisfiedBy('Task')).toBe(true);
    verify(taskRepository.findOneByName('Task')).once();
  });

  it('testTaskDontExist', async () => {
    when(taskRepository.findOneByName('Task')).thenResolve(null);
    expect(await isTaskAlreadyExist.isSatisfiedBy('Task')).toBe(false);
    verify(taskRepository.findOneByName('Task')).once();
  });
});
