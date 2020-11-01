import {mock, instance, when, verify, deepEqual} from 'ts-mockito';
import {TaskRepository} from 'src/Infrastructure/Task/Repository/TaskRepository';
import {IsTaskAlreadyExist} from 'src/Domain/Task/Specification/IsTaskAlreadyExist';
import {CreateTaskCommandHandler} from 'src/Application/Task/Command/CreateTaskCommandHandler';
import {CreateTaskCommand} from 'src/Application/Task/Command/CreateTaskCommand';
import {Task} from 'src/Domain/Task/Task.entity';
import {TaskAlreadyExistException} from 'src/Domain/Task/Exception/TaskAlreadyExistException';

describe('CreateTaskCommandHandler', () => {
  let taskRepository: TaskRepository;
  let isTaskAlreadyExist: IsTaskAlreadyExist;
  let createdTask: Task;
  let handler: CreateTaskCommandHandler;

  const command = new CreateTaskCommand('Development');

  beforeEach(() => {
    taskRepository = mock(TaskRepository);
    isTaskAlreadyExist = mock(IsTaskAlreadyExist);
    createdTask = mock(Task);

    handler = new CreateTaskCommandHandler(
      instance(taskRepository),
      instance(isTaskAlreadyExist)
    );
  });

  it('testTaskCreatedSuccessfully', async () => {
    when(isTaskAlreadyExist.isSatisfiedBy('Development')).thenResolve(false);
    when(createdTask.getId()).thenReturn(
      '1e5fb4da-12c2-11ea-8d71-362b9e155667'
    );

    when(taskRepository.save(deepEqual(new Task('Development')))).thenResolve(
      instance(createdTask)
    );

    expect(await handler.execute(command)).toBe(
      '1e5fb4da-12c2-11ea-8d71-362b9e155667'
    );

    verify(isTaskAlreadyExist.isSatisfiedBy('Development')).once();
    verify(taskRepository.save(deepEqual(new Task('Development')))).once();
    verify(createdTask.getId()).once();
  });

  it('testTaskAlreadyExist', async () => {
    when(isTaskAlreadyExist.isSatisfiedBy('Development')).thenResolve(true);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(TaskAlreadyExistException);
      expect(e.message).toBe('accounting.tasks.errors.already_exist');
      verify(isTaskAlreadyExist.isSatisfiedBy('Development')).once();
      verify(taskRepository.save(deepEqual(new Task('Development')))).never();
      verify(createdTask.getId()).never();
    }
  });
});
