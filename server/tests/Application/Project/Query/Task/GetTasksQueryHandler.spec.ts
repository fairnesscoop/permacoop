import {mock, instance, when, verify} from 'ts-mockito';
import {GetTasksQueryHandler} from 'src/Application/Project/Query/Task/GetTasksQueryHandler';
import {TaskRepository} from 'src/Infrastructure/Project/Repository/TaskRepository';
import {GetTasksQuery} from 'src/Application/Project/Query/Task/GetTasksQuery';
import {Task} from 'src/Domain/Project/Task.entity';
import {TaskView} from 'src/Application/Project/View/TaskView';

describe('GetTasksQueryHandler', () => {
  it('testGetTasks', async () => {
    const taskRepository = mock(TaskRepository);

    const task1 = mock(Task);
    when(task1.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(task1.getName()).thenReturn('Coaching');

    const task2 = mock(Task);
    when(task2.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(task2.getName()).thenReturn('Development');

    const task3 = mock(Task);
    when(task3.getId()).thenReturn('992eb372-cc02-4ffe-86e0-7b955b7f1a6e');
    when(task3.getName()).thenReturn('Product Owner');

    when(taskRepository.findTasks()).thenResolve([
      instance(task1),
      instance(task2),
      instance(task3)
    ]);

    const queryHandler = new GetTasksQueryHandler(instance(taskRepository));
    const expectedResult = [
      new TaskView('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2', 'Coaching'),
      new TaskView('d54f15d6-1a1d-47e8-8672-9f46018f9960', 'Development'),
      new TaskView('992eb372-cc02-4ffe-86e0-7b955b7f1a6e', 'Product Owner')
    ];

    expect(await queryHandler.execute(new GetTasksQuery())).toMatchObject(
      expectedResult
    );
    verify(taskRepository.findTasks()).once();
  });

  it('testGetEmptyTasks', async () => {
    const taskRepository = mock(TaskRepository);

    when(taskRepository.findTasks()).thenResolve([]);

    const queryHandler = new GetTasksQueryHandler(instance(taskRepository));

    expect(await queryHandler.execute(new GetTasksQuery())).toMatchObject([]);
    verify(taskRepository.findTasks()).once();
  });
});
