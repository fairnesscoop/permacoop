import {DailyRate} from '../DailyRate.entity';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {Task} from 'src/Domain/Task/Task.entity';
import {User} from 'src/Domain/HumanResource/User/User.entity';

export interface IDailyRateRepository {
  save(dailyRate: DailyRate): Promise<DailyRate>;
  findOneById(id: string): Promise<DailyRate | undefined>;
  findAll(): Promise<DailyRate[]>;
  findOneByUserCustomerAndTask(
    user: User,
    customer: Customer,
    task: Task
  ): Promise<DailyRate | undefined>;
}
