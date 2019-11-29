import {mock, instance, when, verify} from 'ts-mockito';
import {TaskRepository} from 'src/Infrastructure/Project/Repository/TaskRepository';
import {IsTaskAlreadyExist} from 'src/Domain/Project/Specification/IsTaskAlreadyExist';
import {CreateTaskCommandHandler} from 'src/Application/Project/Command/Task/CreateTaskCommandHandler';
import {CreateTaskCommand} from 'src/Application/Project/Command/Task/CreateTaskCommand';
import {TaskView} from 'src/Application/Project/View/TaskView';
import {Task} from 'src/Domain/Project/Task.entity';

describe('CreateTaskCommandHandler', () => {
  let taskRepository: TaskRepository;
  let isTaskAlreadyExist: IsTaskAlreadyExist;
  let createdTask: Task;
  let handler: CreateTaskCommandHandler;

  const command = new CreateTaskCommand();
  command.name = 'Task';

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
    when(isTaskAlreadyExist.isSatisfiedBy('Task')).thenResolve(false);
    when(createdTask.getId()).thenReturn(
      '1e5fb4da-12c2-11ea-8d71-362b9e155667'
    );
    when(createdTask.getName()).thenReturn('Task');
    when(taskRepository.save(new Task('Task'))).thenResolve(
      instance(createdTask)
    );

    expect(await handler.execute(command)).toMatchObject(
      new TaskView('1e5fb4da-12c2-11ea-8d71-362b9e155667', 'Task')
    );

    verify(isTaskAlreadyExist.isSatisfiedBy('Task')).once();
    verify(taskRepository.save(new Task('Task'))).once();
    verify(createdTask.getId()).once();
    verify(createdTask.getName()).once();
  });
});
