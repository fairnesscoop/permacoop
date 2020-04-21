import {QueryHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {GetDailyRateByIdQuery} from './GetDailyRateByIdQuery';
import {TaskView} from 'src/Application/Task/View/TaskView';
import {IDailyRateRepository} from 'src/Domain/Billing/Repository/IDailyRateRepository';
import {DailyRateView} from '../../View/DailyRate/DailyRateView';
import {DailyRateNotFoundException} from 'src/Domain/Billing/Exception/DailyRateNotFoundException';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';
import {UserView} from 'src/Application/User/View/UserView';

@QueryHandler(GetDailyRateByIdQuery)
export class GetDailyRateByIdQueryHandler {
  constructor(
    @Inject('IDailyRateRepository')
    private readonly dailyRateRepository: IDailyRateRepository
  ) {}

  public async execute(query: GetDailyRateByIdQuery): Promise<DailyRateView> {
    const dailyRate = await this.dailyRateRepository.findOneById(query.id);
    if (!dailyRate) {
      throw new DailyRateNotFoundException();
    }

    const user = dailyRate.getUser();
    const customer = dailyRate.getCustomer();
    const task = dailyRate.getTask();

    return new DailyRateView(
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
    );
  }
}
