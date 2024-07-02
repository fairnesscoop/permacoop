import { Inject, Injectable } from '@nestjs/common';
import { LeaveRequestDetailView } from 'src/Application/HumanResource/Leave/View/LeaveRequestDetailView';
import { LeaveRequestView } from 'src/Application/HumanResource/Leave/View/LeaveRequestView';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { Inline, Row, Table } from 'src/Infrastructure/Tables';
import { formatDate } from 'src/Infrastructure/Common/Utils/dateUtils';
import { formatFullName } from 'src/Infrastructure/Common/Utils/formatUtils';
import {
  ActionsOptions,
  RowBuilder,
  RowFactory
} from 'src/Infrastructure/Tables/RowFactory';
import { Status } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { Picto } from 'src/Infrastructure/Ui/Picto';
import { ITranslator } from 'src/Infrastructure/Translations/ITranslator';

@Injectable()
export class LeaveRequestTableFactory {
  constructor(
    private readonly resolver: RouteNameResolver,
    private rowFactory: RowFactory,
    @Inject('ITranslator')
    private readonly translator: ITranslator
  ) {}

  public create(leaveRequests: LeaveRequestView[], userId: string): Table {
    const columns = [
      'leaves-user',
      'leaves-period',
      'leaves-duration',
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

        if (
          leaveRequest.user.id === userId &&
          leaveRequest.status === Status.PENDING
        ) {
          actions.edit = {
            url: this.resolver.resolve('people_leave_requests_edit', {
              id: leaveRequest.id
            })
          };
        }

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
          .apply(builder => this.addStatusRow(builder, leaveRequest.status))
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
      'leaves-moderator',
      'leaves-moderateAt',
      'leaves-comment'
    ];

    const row = this.rowFactory
      .createBuilder()
      .apply(builder => this.addStatusRow(builder, leaveRequest.status))
      .trans('leaves-type-value', { type: leaveRequest.type })
      .value(formatDate(new Date(leaveRequest.startDate)))
      .value(formatDate(new Date(leaveRequest.endDate)))
      .trans('leaves-duration-value', { days: leaveRequest.duration })
      .value(
        leaveRequest.moderator ? formatFullName(leaveRequest.moderator) : ''
      )
      .value(
        leaveRequest.moderateAt
          ? formatDate(new Date(leaveRequest.moderateAt))
          : ''
      )
      .value(leaveRequest.comment)
      .build();

    return new Inline(columns, row);
  }

  private addStatusRow(builder: RowBuilder, status: Status): void {
    builder.picto(
      {
        [Status.PENDING]: Picto.HOURGLASS,
        [Status.ACCEPTED]: Picto.ACTIVE,
        [Status.REFUSED]: Picto.DISABLED
      }[status],
      this.translator.translate('leaves-status-value', { status }),
      { class: status === Status.PENDING ? 'pc-bold' : '' }
    );
  }
}
