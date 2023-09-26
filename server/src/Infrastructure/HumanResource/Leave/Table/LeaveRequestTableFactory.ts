import { Injectable } from '@nestjs/common';
import { LeaveRequestDetailView } from 'src/Application/HumanResource/Leave/View/LeaveRequestDetailView';
import { LeaveRequestView } from 'src/Application/HumanResource/Leave/View/LeaveRequestView';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import {
  ActionsValue,
  Inline,
  Row,
  Table
} from 'src/Infrastructure/Common/Table/Table';
import { formatDate } from 'src/Infrastructure/Common/Utils/dateUtils';
import { formatFullName } from 'src/Infrastructure/Common/Utils/formatUtils';

@Injectable()
export class LeaveRequestTableFactory {
  constructor(private readonly resolver: RouteNameResolver) {}

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
        const actions: ActionsValue['actions'] = {
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

        return [
          formatFullName(leaveRequest.user),
          {
            trans: {
              message: 'leaves-period-value',
              params: {
                startDate: leaveRequest.startDate,
                endDate: leaveRequest.endDate
              }
            }
          },
          {
            trans: {
              message: 'leaves-type-value',
              params: { type: leaveRequest.type }
            }
          },
          {
            trans: {
              message: 'leaves-status-value',
              params: { status: leaveRequest.status }
            }
          },
          { actions }
        ];
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

    const row: Row = [
      {
        trans: {
          message: 'leaves-status-value',
          params: { status: leaveRequest.status }
        }
      },
      {
        trans: {
          message: 'leaves-type-value',
          params: { type: leaveRequest.type }
        }
      },
      formatDate(new Date(leaveRequest.startDate)),
      formatDate(new Date(leaveRequest.endDate)),
      {
        trans: {
          message: 'leaves-duration-value',
          params: { days: leaveRequest.duration }
        }
      },
      leaveRequest.comment
    ];

    return new Inline(columns, row);
  }
}
