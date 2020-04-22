import {Inject} from '@nestjs/common';
import {User} from 'src/Domain/User/User.entity';
import {Task} from 'src/Domain/Task/Task.entity';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {IDailyRateRepository} from '../Repository/IDailyRateRepository';
import {DailyRate} from '../DailyRate.entity';

export class IsDailyRateAlreadyExist {
  constructor(
    @Inject('IDailyRateRepository')
    private readonly dailyRateRepository: IDailyRateRepository
  ) {}

  public async isSatisfiedBy(
    user: User,
    task: Task,
    customer: Customer
  ): Promise<boolean> {
    return (
      (await this.dailyRateRepository.findOneByUserCustomerAndTask(
        user,
        customer,
        task
      )) instanceof DailyRate
    );
  }
}
