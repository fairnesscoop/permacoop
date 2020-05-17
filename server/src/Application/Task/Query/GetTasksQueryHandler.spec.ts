import {mock, instance, when, verify} from 'ts-mockito';
import {GetTasksQueryHandler} from 'src/Application/Task/Query/GetTasksQueryHandler';
import {TaskRepository} from 'src/Infrastructure/Task/Repository/TaskRepository';
import {GetTasksQuery} from 'src/Application/Task/Query/GetTasksQuery';
import {Task} from 'src/Domain/Task/Task.entity';
import {TaskView} from 'src/Application/Task/View/TaskView';
import {Pagination} from 'src/Application/Common/Pagination';

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

    when(taskRepository.findTasks(1)).thenResolve([
      [instance(task1), instance(task2), instance(task3)],
      3
    ]);

    const queryHandler = new GetTasksQueryHandler(instance(taskRepository));
    const expectedResult = new Pagination<TaskView>(
      [
        new TaskView('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2', 'Coaching'),
        new TaskView('d54f15d6-1a1d-47e8-8672-9f46018f9960', 'Development'),
        new TaskView('992eb372-cc02-4ffe-86e0-7b955b7f1a6e', 'Product Owner')
      ],
      3
    );

    expect(await queryHandler.execute(new GetTasksQuery(1))).toMatchObject(
      expectedResult
    );
    verify(taskRepository.findTasks(1)).once();
  });
});
