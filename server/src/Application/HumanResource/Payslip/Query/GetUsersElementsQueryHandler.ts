import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import { UserElementsView } from '../View/UserElementsView';
import { GetUsersElementsQuery } from './GetUsersElementsQuery';
import { ILeaveRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRepository';
import { GetMealTicketsPerMonthQueryHandler } from '../../MealTicket/Query/GetMealTicketsPerMonthQueryHandler';
import { GetMealTicketsPerMonthQuery } from '../../MealTicket/Query/GetMealTicketsPerMonthQuery';

@QueryHandler(GetUsersElementsQuery)
export class GetUsersElementsQueryHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ILeaveRepository')
    private readonly leaveRepository: ILeaveRepository,
    private readonly getMealTicketsPerMonth: GetMealTicketsPerMonthQueryHandler
  ) {}

  public async execute(
    query: GetUsersElementsQuery
  ): Promise<UserElementsView[]> {

    const userViews: UserElementsView[] = [];

    const date = query.date;

    const [ users, leaves, mealTickets ] = await Promise.all([
      this.userRepository.findUsersWithPayslipInfo(),
      this.leaveRepository.findAllMonthlyLeaves(date),
      this.getMealTicketsPerMonth.execute(new GetMealTicketsPerMonthQuery(date))
    ]);

    const mealTicketsByUser: Record<string, number> = {};
    mealTickets.forEach(view => {
      mealTicketsByUser[view.userId] = view.mealTickets;
    });

    for (const user of users) {
        userViews.push(new UserElementsView(
            user.getFirstName(),
            user.getLastName(),
            user.getUserAdministrative().getContract(),
            user.getUserAdministrative().isExecutivePosition(),
            user.getUserAdministrative().getJoiningDate(),
            user.getUserAdministrative().getAnnualEarnings() * 0.01,
            user.getUserAdministrative().getAnnualEarnings() / 1200,
            user.getUserAdministrative().getWorkingTime(),
            user.getUserAdministrative().getTransportFee() * 0.01,
            mealTicketsByUser[user.getId()],
            user.getUserAdministrative().haveHealthInsurance() ? 'yes' : 'no',
            0,
            0,
            0,
            0
        ));
    }

    return userViews;
  }
}
