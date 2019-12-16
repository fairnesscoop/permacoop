import {QueryHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {GetProjectByIdQuery} from './GetProjectByIdQuery';
import {IProjectRepository} from 'src/Domain/Project/Repository/IProjectRepository';
import {ProjectView} from '../View/ProjectView';
import {ProjectNotFoundException} from 'src/Domain/Project/Exception/ProjectNotFoundException';

@QueryHandler(GetProjectByIdQuery)
export class GetProjectByIdQueryHandler {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository
  ) {}

  public async execute(query: GetProjectByIdQuery): Promise<ProjectView> {
    const project = await this.projectRepository.findOneById(query.id);
    if (!project) {
      throw new ProjectNotFoundException();
    }

    return new ProjectView(project.getId(), project.getName());
  }
}
