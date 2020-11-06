import {mock, instance, when, verify, anything} from 'ts-mockito';
import {TaskRepository} from 'src/Infrastructure/Task/Repository/TaskRepository';
import {IsTaskAlreadyExist} from 'src/Domain/Task/Specification/IsTaskAlreadyExist';
import {Task} from 'src/Domain/Task/Task.entity';
import {UpdateTaskCommand} from './UpdateTaskCommand';
import {TaskNotFoundException} from 'src/Domain/Task/Exception/TaskNotFoundException';
import {TaskAlreadyExistException} from 'src/Domain/Task/Exception/TaskAlreadyExistException';
import {UpdateTaskCommandHandler} from './UpdateTaskCommandHandler';

describe('UpdateTaskCommandHandler', () => {
  let taskRepository: TaskRepository;
  let isTaskAlreadyExist: IsTaskAlreadyExist;
  let updatedTask: Task;
  let handler: UpdateTaskCommandHandler;

  const command = new UpdateTaskCommand(
    'afda00b1-bf49-4102-9bc2-bce17f3acd48',
    'Development mobile'
  );

  beforeEach(() => {
    taskRepository = mock(TaskRepository);
    isTaskAlreadyExist = mock(IsTaskAlreadyExist);
    updatedTask = mock(Task);

    handler = new UpdateTaskCommandHandler(
      instance(taskRepository),
      instance(isTaskAlreadyExist)
    );
  });

  it('testUpdateSuccessfully', async () => {
    when(
      taskRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
    ).thenResolve(instance(updatedTask));
    when(updatedTask.getName()).thenReturn('Development');
    when(isTaskAlreadyExist.isSatisfiedBy('Development mobile')).thenResolve(
      false
    );

    // Command return nothing
    expect(await handler.execute(command)).toBeUndefined();

    verify(isTaskAlreadyExist.isSatisfiedBy('Development mobile')).once();
    verify(taskRepository.save(instance(updatedTask))).once();
    verify(updatedTask.updateName('Development mobile')).once();
    verify(updatedTask.updateName('Development mobile')).calledBefore(
      taskRepository.save(instance(updatedTask))
    );
    verify(updatedTask.getName()).once();
  });

  it('testTaskNotFound', async () => {
    when(
      taskRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(TaskNotFoundException);
      expect(e.message).toBe('accounting.tasks.errors.not_found');
      verify(isTaskAlreadyExist.isSatisfiedBy(anything())).never();
      verify(taskRepository.save(anything())).never();
      verify(updatedTask.updateName(anything())).never();
      verify(updatedTask.getName()).never();
    }
  });

  it('testTaskAlreadyExist', async () => {
    when(
      taskRepository.findOneById('afda00b1-bf49-4102-9bc2-bce17f3acd48')
    ).thenResolve(instance(updatedTask));
    when(isTaskAlreadyExist.isSatisfiedBy('Development mobile')).thenResolve(
      true
    );

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(TaskAlreadyExistException);
      expect(e.message).toBe('accounting.tasks.errors.already_exist');
      verify(isTaskAlreadyExist.isSatisfiedBy('Development mobile')).once();
      verify(taskRepository.save(anything())).never();
      verify(updatedTask.updateName(anything())).never();
      verify(updatedTask.getName()).once();
    }
  });
});
