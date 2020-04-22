import {QueryHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {GetProjectsQuery} from './GetProjectsQuery';
import {ProjectView} from '../View/ProjectView';
import {IProjectRepository} from 'src/Domain/Project/Repository/IProjectRepository';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';

@QueryHandler(GetProjectsQuery)
export class GetProjectsQueryHandler {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository
  ) {}

  public async execute(query: GetProjectsQuery): Promise<ProjectView[]> {
    const {customerId} = query;
    const projects = await this.projectRepository.findProjects(customerId);
    const projectViews: ProjectView[] = [];

    for (const project of projects) {
      const customer = project.getCustomer();

      projectViews.push(
        new ProjectView(
          project.getId(),
          project.getName(),
          new CustomerView(customer.getId(), customer.getName())
        )
      );
    }

    return projectViews;
  }
}
