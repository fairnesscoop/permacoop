import { Injectable } from '@nestjs/common';
import { ILeaveRequestsOverview } from 'src/Domain/HumanResource/Leave/ILeaveRequestsOverview';
import { Table } from 'src/Infrastructure/Tables';
import { RowFactory } from 'src/Infrastructure/Tables/RowFactory';

@Injectable()
export class LeaveRequestsOverviewTableFactory {
  constructor(private rowFactory: RowFactory) {}

  public create(overview: ILeaveRequestsOverview): Table {
    const columns = [];
    const rowBuilder = this.rowFactory.createBuilder();

    for (const type in overview) {
      columns.push(`leaves-overview-${type}`);
      rowBuilder.template('pages/leave_requests/_overview_badge.njk', {
        type,
        days: overview[type]
      });
    }

    const row = rowBuilder.build();

    return new Table(columns, [row]);
  }
}
