import {Inject} from '@nestjs/common';
import {CommandHandler} from '@nestjs/cqrs';
import {CreateTaskCommand} from './CreateTaskCommand';
import {ITaskRepository} from 'src/Domain/Task/Repository/ITaskRepository';
import {IsTaskAlreadyExist} from 'src/Domain/Task/Specification/IsTaskAlreadyExist';
import {TaskAlreadyExistException} from 'src/Domain/Task/Exception/TaskAlreadyExistException';
import {Task} from 'src/Domain/Task/Task.entity';

@CommandHandler(CreateTaskCommand)
export class CreateTaskCommandHandler {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
    private readonly isTaskAlreadyExist: IsTaskAlreadyExist
  ) {}

  public async execute(command: CreateTaskCommand): Promise<string> {
    const {name} = command;

    if (true === (await this.isTaskAlreadyExist.isSatisfiedBy(name))) {
      throw new TaskAlreadyExistException();
    }

    const task = await this.taskRepository.save(new Task(name));

    return task.getId();
  }
}
