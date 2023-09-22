import { Injectable } from '@nestjs/common';
import { TaskView } from 'src/Application/Task/View/TaskView';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { Row, Table } from 'src/Infrastructure/Common/Table/Table';

@Injectable()
export class TaskTableFactory {
  constructor(private readonly resolver: RouteNameResolver) {}

  public create(tasks: TaskView[]): Table {
    const columns = ['crm-tasks-name', 'common-actions'];

    const rows = tasks.map(
      (task): Row => [
        task.name,
        {
          actions: {
            edit: {
              url: this.resolver.resolve('crm_tasks_edit', { id: task.id })
            }
          }
        }
      ]
    );

    return new Table(columns, rows);
  }
}
