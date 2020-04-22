import {QueryHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {GetDailyRatesQuery} from './GetDailyRatesQuery';
import {IDailyRateRepository} from 'src/Domain/Accounting/Repository/IDailyRateRepository';
import {DailyRateView} from '../../View/DailyRate/DailyRateView';
import {UserView} from 'src/Application/User/View/UserView';
import {TaskView} from 'src/Application/Task/View/TaskView';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';

@QueryHandler(GetDailyRatesQuery)
export class GetDailyRatesQueryHandler {
  constructor(
    @Inject('IDailyRateRepository')
    private readonly dailyRateRepository: IDailyRateRepository
  ) {}

  public async execute(query: GetDailyRatesQuery): Promise<DailyRateView[]> {
    const dailyRates = await this.dailyRateRepository.findAll();
    const results: DailyRateView[] = [];

    for (const dailyRate of dailyRates) {
      const user = dailyRate.getUser();
      const task = dailyRate.getTask();
      const customer = dailyRate.getCustomer();

      results.push(
        new DailyRateView(
          dailyRate.getId(),
          dailyRate.getAmount() / 100,
          new UserView(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail()
          ),
          new TaskView(task.getId(), task.getName()),
          new CustomerView(customer.getId(), customer.getName())
        )
      );
    }

    return results;
  }
}
