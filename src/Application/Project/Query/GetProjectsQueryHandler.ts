import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProjectsQuery } from './GetProjectsQuery';
import { ProjectView } from '../View/ProjectView';
import { IProjectRepository } from 'src/Domain/Project/Repository/IProjectRepository';
import { CustomerView } from 'src/Application/Customer/View/CustomerView';
import { Pagination } from 'src/Application/Common/Pagination';

@QueryHandler(GetProjectsQuery)
export class GetProjectsQueryHandler {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository
  ) {}

  public async execute(
    query: GetProjectsQuery
  ): Promise<Pagination<ProjectView>> {
    const { customerId, activeOnly, page } = query;

    const projectViews: ProjectView[] = [];

    const [projects, total] = await this.projectRepository.findProjects(
      page,
      activeOnly,
      customerId
    );

    for (const project of projects) {
      const customer = project.getCustomer();

      projectViews.push(
        new ProjectView(
          project.getId(),
          project.getName(),
          project.isActive(),
          project.getInvoiceUnit(),
          new CustomerView(customer.getId(), customer.getName())
        )
      );
    }

    return new Pagination<ProjectView>(projectViews, total);
  }
}
