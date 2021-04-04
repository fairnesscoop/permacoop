import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IMealTicketRemovalRepository } from 'src/Domain/HumanResource/MealTicket/Repository/IMealTicketRemovalRepository';
import { GetMealTicketCountPerMonthQuery } from './GetMealTicketCountPerMonthQuery';
import { IDateUtils } from 'src/Application/IDateUtils';
import { AvailableMealTicketStrategy } from 'src/Domain/HumanResource/MealTicket/Strategy/AvailableMealTicketStrategy';
import { getMonth } from 'date-fns';
import { MealTicketGrouppedByMonthSummary } from 'src/Domain/HumanResource/MealTicket/Strategy/MealTicketGrouppedByMonthSummary';
import { MealTicketRemovalSummaryDTO } from 'src/Infrastructure/HumanResource/MealTicket/DTO/MealTicketRemovalSummaryDTO';

@QueryHandler(GetMealTicketCountPerMonthQuery)
export class GetMealTicketCountPerMonthQueryHandler {
  constructor(
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    @Inject('IMealTicketRemovalRepository')
    private readonly mealTicketRemovalRepository: IMealTicketRemovalRepository
  ) { }

  private removeMealTicketsFromYearlyAvailableMealTickets = (
    mealTicketRemovals: MealTicketRemovalSummaryDTO[],
    mealTicketGrouppedByMonthSummaries: MealTicketGrouppedByMonthSummary[]
  ): MealTicketGrouppedByMonthSummary[] => {

    return mealTicketGrouppedByMonthSummaries.map(summary => {
      const foudTicketRemoval = mealTicketRemovals.find(item => {
        const month = getMonth(item.date) + 1;
        return summary.month === month;
      })
      if (foudTicketRemoval) {
        if (summary.mealTicketCount >= foudTicketRemoval.count) {
          summary.setMealTicketCount(summary.mealTicketCount - foudTicketRemoval.count)
        }
        else {
          summary.setMealTicketCount(0)
        }
      }
      return summary
    })

  }


  public async execute(
    command: GetMealTicketCountPerMonthQuery
  ): Promise<MealTicketGrouppedByMonthSummary[]> {
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
        mealTicketRemovals,
        yearlyAvailableMealTickets,
      )

    );
  }
}
