import {mock, instance, when, verify} from 'ts-mockito';
import {TaskRepository} from 'src/Infrastructure/Project/Repository/TaskRepository';
import {Task} from 'src/Domain/Project/Task.entity';
import {TaskView} from 'src/Application/Project/View/TaskView';
import {GetTaskByIdQueryHandler} from './GetTaskByIdQueryHandler';
import {GetTaskByIdQuery} from './GetTaskByIdQuery';
import {TaskNotFoundException} from 'src/Domain/Project/Exception/TaskNotFoundException';

describe('GetTaskByIdQueryHandler', () => {
  const query = new GetTaskByIdQuery();
  query.id = 'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2';

  it('testGetTask', async () => {
    const taskRepository = mock(TaskRepository);
    const queryHandler = new GetTaskByIdQueryHandler(instance(taskRepository));
    const expectedResult = new TaskView(
      'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
      'Coaching'
    );
    const task = mock(Task);

    when(task.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(task.getName()).thenReturn('Coaching');
    when(
      taskRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(task));

    expect(await queryHandler.execute(query)).toMatchObject(expectedResult);

    verify(
      taskRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
  });

  it('testGetTaskNotFound', async () => {
    const taskRepository = mock(TaskRepository);
    const queryHandler = new GetTaskByIdQueryHandler(instance(taskRepository));
    when(
      taskRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      await queryHandler.execute(query);
    } catch (e) {
      expect(e).toBeInstanceOf(TaskNotFoundException);
      expect(e.message).toBe('task.errors.not_found');
      verify(
        taskRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
