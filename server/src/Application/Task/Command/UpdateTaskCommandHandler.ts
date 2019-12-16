import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {UpdateTaskCommand} from './UpdateTaskCommand';
import {ITaskRepository} from 'src/Domain/Task/Repository/ITaskRepository';
import {TaskNotFoundException} from 'src/Domain/Task/Exception/TaskNotFoundException';
import {IsTaskAlreadyExist} from 'src/Domain/Task/Specification/IsTaskAlreadyExist';
import {TaskAlreadyExistException} from 'src/Domain/Task/Exception/TaskAlreadyExistException';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskCommandHandler {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
    private readonly isTaskAlreadyExist: IsTaskAlreadyExist
  ) {}

  public async execute(command: UpdateTaskCommand): Promise<void> {
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
  }
}
