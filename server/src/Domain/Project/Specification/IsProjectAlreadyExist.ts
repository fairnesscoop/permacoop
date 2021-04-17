import { Inject } from '@nestjs/common';
import { IProjectRepository } from 'src/Domain/Project/Repository/IProjectRepository';
import { Project } from 'src/Domain/Project/Project.entity';

export class IsProjectAlreadyExist {
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
