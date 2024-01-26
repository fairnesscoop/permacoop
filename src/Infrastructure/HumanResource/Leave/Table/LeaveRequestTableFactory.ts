import { Injectable } from '@nestjs/common';
import { LeaveRequestDetailView } from 'src/Application/HumanResource/Leave/View/LeaveRequestDetailView';
import { LeaveRequestView } from 'src/Application/HumanResource/Leave/View/LeaveRequestView';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { Inline, Row, Table } from 'src/Infrastructure/Tables';
import { formatDate } from 'src/Infrastructure/Common/Utils/dateUtils';
import { formatFullName } from 'src/Infrastructure/Common/Utils/formatUtils';
import {
  ActionsOptions,
  RowFactory
} from 'src/Infrastructure/Tables/RowFactory';

@Injectable()
export class LeaveRequestTableFactory {
  constructor(
    private readonly resolver: RouteNameResolver,
    private rowFactory: RowFactory
  ) {}

  public create(leaveRequests: LeaveRequestView[], userId: string): Table {
    const columns = [
      'leaves-user',
      'leaves-period',
      'leaves-type',
      'leaves-status',
      'common-actions'
    ];

    const rows = leaveRequests.map(
      (leaveRequest): Row => {
        const actions: ActionsOptions = {
          view: {
            url: this.resolver.resolve('people_leave_requests_detail', {
              id: leaveRequest.id
            })
          }
        };

        if (leaveRequest.user.id === userId) {
          actions.edit = {
            url: this.resolver.resolve('people_leave_requests_edit', {
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
          .trans('leaves-type-value', { type: leaveRequest.type })
          .trans('leaves-status-value', { status: leaveRequest.status })
          .actions(actions)
          .build();
      }
    );

    return new Table(columns, rows);
  }

  public createInline(leaveRequest: LeaveRequestDetailView): Inline {
    const columns = [
      'leaves-status',
      'leaves-type',
      'leaves-startDate',
      'leaves-endDate',
      'leaves-duration',
      'leaves-comment'
    ];

    const row = this.rowFactory
      .createBuilder()
      .trans('leaves-status-value', { status: leaveRequest.status })
      .trans('leaves-type-value', { type: leaveRequest.type })
      .value(formatDate(new Date(leaveRequest.startDate)))
      .value(formatDate(new Date(leaveRequest.endDate)))
      .trans('leaves-duration-value', { days: leaveRequest.duration })
      .value(leaveRequest.comment)
      .build();

    return new Inline(columns, row);
  }
}
