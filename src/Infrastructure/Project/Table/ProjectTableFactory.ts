import { Injectable } from '@nestjs/common';
import { ProjectView } from 'src/Application/Project/View/ProjectView';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { RowFactory } from 'src/Infrastructure/Tables/RowFactory';
import { Table } from 'src/Infrastructure/Tables';

@Injectable()
export class ProjectTableFactory {
  constructor(
    private readonly resolver: RouteNameResolver,
    private readonly rowFactory: RowFactory
  ) {}

  public create(projects: ProjectView[]): Table {
    const columns = [
      'crm-projects-name-title',
      'crm-projects-customer-title',
      'common-actions'
    ];

    const rows = projects.map(project =>
      this.rowFactory
        .createBuilder()
        .value(project.name)
        .value(project.customer.name)
        .actions({
          edit: {
            url: this.resolver.resolve('crm_projects_edit', {
              id: project.id
            })
          }
        })
        .build()
    );

    return new Table(columns, rows);
  }
}
