import { Injectable } from '@nestjs/common';
import { LeaveRequestView } from 'src/Application/HumanResource/Leave/View/LeaveRequestView';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { Row, Table } from 'src/Infrastructure/Tables';
import { formatFullName } from 'src/Infrastructure/Common/Utils/formatUtils';
import {
  ActionsOptions,
  RowFactory
} from 'src/Infrastructure/Tables/RowFactory';

@Injectable()
export class LeaveTableFactory {
  constructor(
    private readonly resolver: RouteNameResolver,
    private readonly rowFactory: RowFactory
  ) {}

  public create(leaveRequests: LeaveRequestView[]): Table {
    const columns = [
      'leaves-user',
      'leaves-period',
      'leaves-duration',
      'leaves-type',
      'common-actions'
    ];

    const rows = leaveRequests.map(
      (leaveRequest): Row => {
        const actions: ActionsOptions = {};

        if (leaveRequest.canCancel) {
          actions.delete = {
            url: this.resolver.resolve('people_leave_requests_delete', {
              id: leaveRequest.id
            })
          };
        }

        return this.rowFactory
          .createBuilder()
          .value(formatFullName(leaveRequest.user))
          .trans('leaves-period-value', {
            startDate: leaveRequest.startDate,
            endDate: leaveRequest.endDate
          })
          .trans('leaves-duration-value', { days: leaveRequest.duration })
          .trans('leaves-type-value', { type: leaveRequest.type })
          .actions(actions)
          .build();
      }
    );

    return new Table(columns, rows);
  }
}
