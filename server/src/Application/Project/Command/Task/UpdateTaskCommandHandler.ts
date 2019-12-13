import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {UpdateTaskCommand} from './UpdateTaskCommand';
import {ITaskRepository} from 'src/Domain/Project/Repository/ITaskRepository';
import {TaskView} from '../../View/TaskView';
import {TaskNotFoundException} from 'src/Domain/Project/Exception/TaskNotFoundException';
import {IsTaskAlreadyExist} from 'src/Domain/Project/Specification/IsTaskAlreadyExist';
import {TaskAlreadyExistException} from 'src/Domain/Project/Exception/TaskAlreadyExistException';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskCommandHandler {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
    private readonly isTaskAlreadyExist: IsTaskAlreadyExist
  ) {}

  public async execute(command: UpdateTaskCommand): Promise<TaskView> {
    const {id, name} = command;

    const task = await this.taskRepository.findOneById(id);
    if (!task) {
      throw new TaskNotFoundException();
    }

    if (
      name !== task.getName() &&
      true === (await this.isTaskAlreadyExist.isSatisfiedBy(name))
    ) {
      throw new TaskAlreadyExistException();
    }

    task.updateName(name);

    await this.taskRepository.save(task);

    return new TaskView(task.getId(), task.getName());
  }
}
