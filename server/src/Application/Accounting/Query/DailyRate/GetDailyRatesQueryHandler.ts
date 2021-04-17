import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDailyRatesQuery } from './GetDailyRatesQuery';
import { IDailyRateRepository } from 'src/Domain/Accounting/Repository/IDailyRateRepository';
import { DailyRateView } from '../../View/DailyRate/DailyRateView';
import { UserSummaryView } from 'src/Application/HumanResource/User/View/UserSummaryView';
import { TaskView } from 'src/Application/Task/View/TaskView';
import { CustomerView } from 'src/Application/Customer/View/CustomerView';
import { Pagination } from 'src/Application/Common/Pagination';

@QueryHandler(GetDailyRatesQuery)
export class GetDailyRatesQueryHandler {
  constructor(
    @Inject('IDailyRateRepository')
    private readonly dailyRateRepository: IDailyRateRepository
  ) {}

  public async execute(
    query: GetDailyRatesQuery
  ): Promise<Pagination<DailyRateView>> {
    const results: DailyRateView[] = [];
    const [dailyRates, total] = await this.dailyRateRepository.findDailyRates(
      query.page
    );

    for (const dailyRate of dailyRates) {
      const user = dailyRate.getUser();
      const task = dailyRate.getTask();
      const customer = dailyRate.getCustomer();

      results.push(
        new DailyRateView(
          dailyRate.getId(),
          dailyRate.getAmount() / 100,
          new UserSummaryView(
            user.getId(),
            user.getFirstName(),
            user.getLastName()
          ),
          new TaskView(task.getId(), task.getName()),
          new CustomerView(customer.getId(), customer.getName())
        )
      );
    }

    return new Pagination<DailyRateView>(results, total);
  }
}
