import { mock, instance, when, verify } from 'ts-mockito';
import { TaskRepository } from 'src/Infrastructure/Task/Repository/TaskRepository';
import { IsTaskAlreadyExist } from 'src/Domain/Task/Specification/IsTaskAlreadyExist';
import { Task } from 'src/Domain/Task/Task.entity';

describe('IsTaskAlreadyExist', () => {
  let taskRepository: TaskRepository;
  let isTaskAlreadyExist: IsTaskAlreadyExist;

  beforeEach(() => {
    taskRepository = mock(TaskRepository);
    isTaskAlreadyExist = new IsTaskAlreadyExist(instance(taskRepository));
  });

  it('testTaskAlreadyExist', async () => {
    when(taskRepository.findOneByName('Development')).thenResolve(
      new Task('Development')
    );
    expect(await isTaskAlreadyExist.isSatisfiedBy('Development')).toBe(true);
    verify(taskRepository.findOneByName('Development')).once();
  });

  it('testTaskDontExist', async () => {
    when(taskRepository.findOneByName('Development')).thenResolve(null);
    expect(await isTaskAlreadyExist.isSatisfiedBy('Development')).toBe(false);
    verify(taskRepository.findOneByName('Development')).once();
  });
});
