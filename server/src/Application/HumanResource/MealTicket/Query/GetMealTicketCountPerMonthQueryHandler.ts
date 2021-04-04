import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IMealTicketRemovalRepository } from 'src/Domain/HumanResource/MealTicket/Repository/IMealTicketRemovalRepository';
import { GetMealTicketCountPerMonthQuery } from './GetMealTicketCountPerMonthQuery';
import { IDateUtils } from 'src/Application/IDateUtils';
import { AvailableMealTicketStrategy } from 'src/Domain/HumanResource/MealTicket/Strategy/AvailableMealTicketStrategy';
import { getMonth } from 'date-fns';
import { MealTicketGrouppedByMonthSummary } from 'src/Domain/HumanResource/MealTicket/Strategy/MealTicketGrouppedByMonthSummary';
import { MealTicketRemovalSummaryDTO } from 'src/Infrastructure/HumanResource/MealTicket/DTO/MealTicketRemovalSummaryDTO';
import { MealTicketSummaryDTO } from 'src/Infrastructure/HumanResource/MealTicket/DTO/MealTicketSummaryDTO';

@QueryHandler(GetMealTicketCountPerMonthQuery)
export class GetMealTicketCountPerMonthQueryHandler {
  constructor(
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    @Inject('IMealTicketRemovalRepository')
    private readonly mealTicketRemovalRepository: IMealTicketRemovalRepository
  ) { }

  private buildMealTicketSummary = (
    mealTicketRemovals: MealTicketRemovalSummaryDTO[],
    mealTicketGrouppedByMonthSummaries: MealTicketGrouppedByMonthSummary[]
  ): MealTicketSummaryDTO[] => {
    return mealTicketGrouppedByMonthSummaries.map(summary => {

      const month = summary.month;
      const base = summary.mealTicketCount;
      let total = base;
      let mealTicketRemovalCount = 0;

      const foudTicketRemoval = mealTicketRemovals.find(item => {
        const _month = getMonth(item.date) + 1;
        return summary.month === _month;
      })

      if (foudTicketRemoval) {
        mealTicketRemovalCount = foudTicketRemoval.count;
        if (summary.mealTicketCount >= foudTicketRemoval.count) {
          total = summary.mealTicketCount - foudTicketRemoval.count
        }
        else {
          total = 0
        }
      }

      return new MealTicketSummaryDTO(month, base, mealTicketRemovalCount, total)
    })

  }


  public async execute(
    command: GetMealTicketCountPerMonthQuery
  ): Promise<MealTicketSummaryDTO[]> {
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
      this.buildMealTicketSummary(
        mealTicketRemovals,
        yearlyAvailableMealTickets,
      )

    );
  }
}
