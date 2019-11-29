import {Inject} from '@nestjs/common';
import {CommandHandler} from '@nestjs/cqrs';
import {CreateTaskCommand} from './CreateTaskCommand';
import {ITaskRepository} from 'src/Domain/Project/Repository/ITaskRepository';
import {TaskView} from '../../View/TaskView';
import {IsTaskAlreadyExist} from 'src/Domain/Project/Specification/IsTaskAlreadyExist';
import {TaskAlreadyExistException} from 'src/Domain/Project/Exception/TaskAlreadyExistException';
import {Task} from 'src/Domain/Project/Task.entity';

@CommandHandler(CreateTaskCommand)
export class CreateTaskCommandHandler {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
    private readonly isTaskAlreadyExist: IsTaskAlreadyExist
  ) {}

  public async execute(command: CreateTaskCommand): Promise<TaskView> {
    const {name} = command;

    if (true === (await this.isTaskAlreadyExist.isSatisfiedBy(name))) {
      throw new TaskAlreadyExistException();
    }

    const task = await this.taskRepository.save(new Task(name));

    return new TaskView(task.getId(), task.getId());
  }
}
