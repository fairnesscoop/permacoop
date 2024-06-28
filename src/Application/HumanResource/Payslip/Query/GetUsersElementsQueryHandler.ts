import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import { UserElementsView } from '../View/UserElementsView';
import { GetUsersElementsQuery } from './GetUsersElementsQuery';
import { GetMealTicketsPerMonthQueryHandler } from '../../MealTicket/Query/GetMealTicketsPerMonthQueryHandler';
import { GetMealTicketsPerMonthQuery } from '../../MealTicket/Query/GetMealTicketsPerMonthQuery';
import { GetLeavesByMonthQueryHandler } from '../../Leave/Query/GetLeavesByMonthQueryHandler';
import { GetLeavesByMonthQuery } from '../../Leave/Query/GetLeavesByMonthQuery';
import { LeaveRequest } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { IDateUtils } from 'src/Application/IDateUtils';
import { MonthDate } from 'src/Application/Common/MonthDate';
import { UserLeavesView } from '../View/UserLeavesView';
import { LeaveRequestSlotView } from '../../Leave/View/LeaveRequestSlotView';

@QueryHandler(GetUsersElementsQuery)
export class GetUsersElementsQueryHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly getLeavesByMonthQueryHandler: GetLeavesByMonthQueryHandler,
    private readonly getMealTicketsPerMonth: GetMealTicketsPerMonthQueryHandler,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils
  ) {}

  public async execute(
    query: GetUsersElementsQuery
  ): Promise<UserElementsView[]> {
    const userViews: UserElementsView[] = [];

    const date = query.date;

    const [users, leaves, mealTickets] = await Promise.all([
      this.userRepository.findUsersWithPayslipInfo(),
      this.getLeavesByMonthQueryHandler.execute(
        new GetLeavesByMonthQuery(date)
      ),
      this.getMealTicketsPerMonth.execute(new GetMealTicketsPerMonthQuery(date))
    ]);

    const mealTicketsByUser: Record<string, number> = {};
    mealTickets.forEach(view => {
      mealTicketsByUser[view.userId] = view.mealTickets;
    });

    for (const user of users) {
      const userLeaves = leaves.getLeavesByUser(user);

      userViews.push(
        new UserElementsView(
          user.getFirstName(),
          user.getLastName(),
          user.getUserAdministrative().getContract(),
          user.getUserAdministrative().isExecutivePosition(),
          user.getUserAdministrative().getJoiningDate(),
          user.getUserAdministrative().getAnnualEarnings() * 0.01,
          user.getUserAdministrative().getAnnualEarnings() / 1200,
          user.getUserAdministrative().getWorkingTime(),
          user.getUserAdministrative().getTransportFee() * 0.01,
          user.getUserAdministrative().getSustainableMobilityFee() * 0.01,
          mealTicketsByUser[user.getId()],
          user.getUserAdministrative().haveHealthInsurance(),
          this.createUserLeavesView(userLeaves.paid, date),
          this.createUserLeavesView(userLeaves.unpaid, date),
          this.createUserLeavesView(userLeaves.medical, date),
          this.createUserLeavesView(userLeaves.special, date),
          this.createUserLeavesView(userLeaves.postponedWorkedFreeDay, date),
          this.createUserLeavesView(userLeaves.relocation, date)
        )
      );
    }

    return userViews;
  }

  private createUserLeavesView(
    leaves: LeaveRequest[],
    date: Date
  ): UserLeavesView {
    const monthDate = this.dateUtils.getMonth(date);

    let leaveCount = 0;
    const leavesSlotViews: LeaveRequestSlotView[] = [];

    for (const leave of leaves) {
      const monthScopedLeave = this.getMonthScopedLeave(leave, monthDate);

      leaveCount += this.dateUtils.getLeaveDuration(
        monthScopedLeave.startDate,
        monthScopedLeave.startsAllDay,
        monthScopedLeave.endDate,
        monthScopedLeave.endsAllDay
      );
      leavesSlotViews.push(
        new LeaveRequestSlotView(
          monthScopedLeave.startDate,
          monthScopedLeave.endDate
        )
      );
    }

    return new UserLeavesView(leaveCount, leavesSlotViews);
  }

  private getMonthScopedLeave(
    leave: LeaveRequest,
    month: MonthDate
  ): LeaveSlot {
    const scopedLeave = new LeaveSlot();

    if (new Date(leave.getStartDate()) >= month.getFirstDay()) {
      scopedLeave.startDate = leave.getStartDate();
      scopedLeave.startsAllDay = leave.isStartsAllDay();
    } else {
      scopedLeave.startDate = month.getFirstDay().toISOString();
      scopedLeave.startsAllDay = true;
    }

    if (new Date(leave.getEndDate()) <= month.getLastDay()) {
      scopedLeave.endDate = leave.getEndDate();
      scopedLeave.endsAllDay = leave.isEndsAllDay();
    } else {
      scopedLeave.endDate = month.getLastDay().toISOString();
      scopedLeave.endsAllDay = true;
    }

    return scopedLeave;
  }
}

class LeaveSlot {
  public startDate: string;
  public startsAllDay: boolean;
  public endDate: string;
  public endsAllDay: boolean;
}
