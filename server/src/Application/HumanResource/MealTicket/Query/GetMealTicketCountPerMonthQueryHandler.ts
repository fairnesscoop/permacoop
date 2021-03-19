import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IMealTicketRemovalRepository } from 'src/Domain/HumanResource/MealTicket/Repository/IMealTicketRemovalRepository';
import { GetMealTicketCountPerMonthQuery } from './GetMealTicketCountPerMonthQuery';
import { IDateUtils } from 'src/Application/IDateUtils';
import { AvailableMealTicketStrategy } from 'src/Domain/HumanResource/MealTicket/Strategy/AvailableMealTicketStrategy';
import { getMonth } from 'date-fns';

@QueryHandler(GetMealTicketCountPerMonthQuery)
export class GetMealTicketCountPerMonthQueryHandler {
  constructor(
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    @Inject('IMealTicketRemovalRepository')
    private readonly mealTicketRemovalRepository: IMealTicketRemovalRepository
  ) {}

  private removeMealTicketsFromYearlyAvailableMealTickets = (
    yearlyAvailableMealTickets: { [key: string]: number },
    mealTicketRemovals: any[]
  ) => {
    const mealTicketsAvailable = Object.keys(yearlyAvailableMealTickets).reduce(
      (prev, current) => {
        const month = parseInt(current, 10);
        const foundMealTicketRemoval = mealTicketRemovals.find(
          item => getMonth(item.date) + 1 === month
        );

        if (!foundMealTicketRemoval) {
          return {
            ...prev,
            [current]: yearlyAvailableMealTickets[current]
          };
        }

        return {
          ...prev,
          [current]:
            yearlyAvailableMealTickets[current] - foundMealTicketRemoval.count
        };
      },
      {}
    );

    return mealTicketsAvailable;
  };

  public async execute(
    command: GetMealTicketCountPerMonthQuery
  ): Promise<{ [month: string]: number }> {
    const { user, currentDate } = command;
    const workingDaysByMonth = this.dateUtils.getAllWorkingDayOfYearByMonth(
      currentDate
    );
    const yearlyAvailableMealTickets = AvailableMealTicketStrategy.getMealTicketCountForEachMonthOfTheYear(
      workingDaysByMonth
    );

    const mealTicketRemovals = await this.mealTicketRemovalRepository.getAllByUserGroupedByDate(
      user
    );

    return Promise.resolve(
      this.removeMealTicketsFromYearlyAvailableMealTickets(
        yearlyAvailableMealTickets,
        mealTicketRemovals
      )
    );
  }
}
