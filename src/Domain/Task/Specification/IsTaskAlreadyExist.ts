import { Inject } from '@nestjs/common';
import { ITaskRepository } from '../Repository/ITaskRepository';
import { Task } from '../Task.entity';

export class IsTaskAlreadyExist {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository
  ) {}

  public async isSatisfiedBy(name: string): Promise<boolean> {
    return (await this.taskRepository.findOneByName(name)) instanceof Task;
  }
}
