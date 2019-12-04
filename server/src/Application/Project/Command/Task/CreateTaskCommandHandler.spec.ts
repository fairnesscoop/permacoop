import {mock, instance, when, verify, deepEqual} from 'ts-mockito';
import {TaskRepository} from 'src/Infrastructure/Project/Repository/TaskRepository';
import {IsTaskAlreadyExist} from 'src/Domain/Project/Specification/IsTaskAlreadyExist';
import {CreateTaskCommandHandler} from 'src/Application/Project/Command/Task/CreateTaskCommandHandler';
import {CreateTaskCommand} from 'src/Application/Project/Command/Task/CreateTaskCommand';
import {TaskView} from 'src/Application/Project/View/TaskView';
import {Task} from 'src/Domain/Project/Task.entity';
import {TaskAlreadyExistException} from 'src/Domain/Project/Exception/TaskAlreadyExistException';

describe('CreateTaskCommandHandler', () => {
  let taskRepository: TaskRepository;
  let isTaskAlreadyExist: IsTaskAlreadyExist;
  let createdTask: Task;
  let handler: CreateTaskCommandHandler;

  const command = new CreateTaskCommand();
  command.name = 'Development';

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
    when(createdTask.getName()).thenReturn('Development');
    when(taskRepository.save(deepEqual(new Task('Development')))).thenResolve(
      instance(createdTask)
    );

    expect(await handler.execute(command)).toMatchObject(
      new TaskView('1e5fb4da-12c2-11ea-8d71-362b9e155667', 'Development')
    );

    verify(isTaskAlreadyExist.isSatisfiedBy('Development')).once();
    verify(taskRepository.save(deepEqual(new Task('Development')))).once();
    verify(createdTask.getId()).once();
    verify(createdTask.getName()).once();
  });

  it('testTaskAlreadyExist', async () => {
    when(isTaskAlreadyExist.isSatisfiedBy('Development')).thenResolve(true);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(TaskAlreadyExistException);
      expect(e.message).toBe('task.errors.already_exist');
      verify(isTaskAlreadyExist.isSatisfiedBy('Development')).once();
      verify(taskRepository.save(deepEqual(new Task('Development')))).never();
      verify(createdTask.getId()).never();
      verify(createdTask.getName()).never();
    }
  });
});
