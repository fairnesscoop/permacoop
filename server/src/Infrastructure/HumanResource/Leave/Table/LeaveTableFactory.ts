import { Injectable } from '@nestjs/common';
import { LeaveRequestView } from 'src/Application/HumanResource/Leave/View/LeaveRequestView';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import {
  ActionsValue,
  Row,
  Table
} from 'src/Infrastructure/Common/Table/Table';
import { formatFullName } from 'src/Infrastructure/Common/Utils/formatUtils';

@Injectable()
export class LeaveTableFactory {
  constructor(private readonly resolver: RouteNameResolver) {}

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
        const actions: ActionsValue['actions'] = {};

        if (leaveRequest.canCancel) {
          actions.delete = {
            url: this.resolver.resolve('people_leave_requests_delete', {
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
              message: 'leaves-duration-value',
              params: {
                days: leaveRequest.duration
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
            actions
          }
        ];
      }
    );

    return new Table(columns, rows);
  }
}
