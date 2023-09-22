import { Injectable } from '@nestjs/common';
import { ProjectView } from 'src/Application/Project/View/ProjectView';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { Row, Table } from 'src/Infrastructure/Common/Table/Table';

@Injectable()
export class ProjectTableFactory {
  constructor(private readonly resolver: RouteNameResolver) {}

  public create(projects: ProjectView[]): Table {
    const columns = [
      'crm-projects-name-title',
      'crm-projects-customer-title',
      'common-actions'
    ];

    const rows = projects.map(
      (project): Row => [
        project.name,
        project.customer.name,
        {
          actions: {
            edit: {
              url: this.resolver.resolve('crm_projects_edit', {
                id: project.id
              })
            }
          }
        }
      ]
    );

    return new Table(columns, rows);
  }
}
