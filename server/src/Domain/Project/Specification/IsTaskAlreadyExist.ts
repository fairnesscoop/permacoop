import {Injectable, Inject} from '@nestjs/common';
import {ISpecification} from 'src/Domain/ISpecification';
import {ITaskRepository} from '../Repository/ITaskRepository';
import {Task} from '../Task.entity';

@Injectable()
export class IsTaskAlreadyExist implements ISpecification {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository
  ) {}

  public async isSatisfiedBy(name: string): Promise<boolean> {
    return (await this.taskRepository.findOneByName(name)) instanceof Task;
  }
}
