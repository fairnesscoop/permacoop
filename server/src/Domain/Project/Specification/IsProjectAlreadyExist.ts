import {Injectable, Inject} from '@nestjs/common';
import {ISpecification} from 'src/Domain/ISpecification';
import {IProjectRepository} from 'src/Domain/Project/Repository/IProjectRepository';
import {Project} from 'src/Domain/Project/Project.entity';

@Injectable()
export class IsProjectAlreadyExist implements ISpecification {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository
  ) {}

  public async isSatisfiedBy(name: string): Promise<boolean> {
    return (
      (await this.projectRepository.findOneByName(name)) instanceof Project
    );
  }
}
