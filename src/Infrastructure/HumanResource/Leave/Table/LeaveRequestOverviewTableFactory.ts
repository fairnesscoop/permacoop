import { Inject, Injectable } from '@nestjs/common';
import { IQueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from 'src/Application/HumanResource/User/Query/GetUsersQuery';
import { UserView } from 'src/Application/HumanResource/User/View/UserView';
import { ILeaveRequestsOverview } from 'src/Domain/HumanResource/Leave/ILeaveRequestsOverview';
import { Table } from 'src/Infrastructure/Tables';
import { HtmlColumn } from 'src/Infrastructure/Tables/HtmlColumn';
import { RowFactory } from 'src/Infrastructure/Tables/RowFactory';
import { ITemplates } from 'src/Infrastructure/Templates/ITemplates';

@Injectable()
export class LeaveRequestsOverviewTableFactory {
  constructor(
    @Inject('IQueryBus')
    private queryBus: IQueryBus,
    private rowFactory: RowFactory,
    @Inject('ITemplates')
    private templates: ITemplates
  ) {}

  public async create(
    overview: ILeaveRequestsOverview,
    userId: string
  ): Promise<Table> {
    const users: UserView[] = await this.queryBus.execute(
      new GetUsersQuery(false, true)
    );

    const columns = [
      'leaves-user',
      new HtmlColumn(
        'leaves-overview-daysRemaining',
        this.templates.render(
          'pages/leave_requests/overview/days_remaining_column_header.njk',
          {
            daysPerYear: overview.daysPerYear
          }
        )
      )
    ];

    const row = this.rowFactory
      .createBuilder()
      .template('pages/leave_requests/overview/user_cell.njk', {
        users,
        userId
      })
      .template('pages/leave_requests/overview/days_remaining_cell.njk', {
        daysRemaining: overview.daysRemaining
      })
      .build();

    return new Table(columns, [row]);
  }
}
