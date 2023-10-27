import { Injectable } from '@nestjs/common';
import { TaskView } from 'src/Application/Task/View/TaskView';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { RowFactory } from 'src/Infrastructure/Tables/RowFactory';
import { Table } from 'src/Infrastructure/Tables';

@Injectable()
export class TaskTableFactory {
  constructor(
    private readonly resolver: RouteNameResolver,
    private readonly rowFactory: RowFactory
  ) {}

  public create(tasks: TaskView[]): Table {
    const columns = ['crm-tasks-name', 'common-actions'];

    const rows = tasks.map(task =>
      this.rowFactory
        .createBuilder()
        .value(task.name)
        .actions({
          edit: {
            url: this.resolver.resolve('crm_tasks_edit', { id: task.id })
          }
        })
        .build()
    );

    return new Table(columns, rows);
  }
}
