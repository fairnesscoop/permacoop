import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IMealTicketRemovalRepository } from 'src/Domain/HumanResource/MealTicket/Repository/IMealTicketRemovalRepository';
import { GetMealTicketCountPerMonthQuery } from './GetMealTicketCountPerMonthQuery';
import { IDateUtils } from 'src/Application/IDateUtils';
import { AvailableMealTicketStrategy } from 'src/Domain/HumanResource/MealTicket/Strategy/AvailableMealTicketStrategy';
import { getMonth } from 'date-fns';
import { MealTicketGroupedByMonthSummary } from 'src/Domain/HumanResource/MealTicket/Strategy/MealTicketGroupedByMonthSummary';
import { MealTicketRemovalSummaryDTO } from 'src/Infrastructure/HumanResource/MealTicket/DTO/MealTicketRemovalSummaryDTO';
import { MealTicketSummaryDTO } from 'src/Domain/HumanResource/MealTicket/DTO/MealTicketSummaryDTO';

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
    mealTicketGroupedByMonthSummaries: MealTicketGroupedByMonthSummary[]
  ): MealTicketSummaryDTO[] => {
    return mealTicketGroupedByMonthSummaries.map(summary => {
      const month = summary.month;
      const base = summary.mealTicketCount;
      let total = base;

      const foundTicketRemoval = mealTicketRemovals.find(item => {
        const _month = getMonth(item.date) + 1;
        return summary.month === _month;
      });

      if (foundTicketRemoval) {
        total = total - foundTicketRemoval.count;
      }

      return new MealTicketSummaryDTO(
        month,
        base,
        foundTicketRemoval ? foundTicketRemoval.count : 0,
        total
      );
    });
  };

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

    const mealTicketRemovals = await this.mealTicketRemovalRepository.getAllByUserGroupedByMonth(
      user
    );

    return this.buildMealTicketSummary(
      mealTicketRemovals,
      yearlyAvailableMealTickets
    );
  }
}
