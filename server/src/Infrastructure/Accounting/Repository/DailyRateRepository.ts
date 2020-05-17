import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {IDailyRateRepository} from 'src/Domain/Accounting/Repository/IDailyRateRepository';
import {DailyRate} from 'src/Domain/Accounting/DailyRate.entity';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {Task} from 'src/Domain/Task/Task.entity';
import {MAX_ITEMS_PER_PAGE} from 'src/Application/Common/Pagination';

export class DailyRateRepository implements IDailyRateRepository {
  constructor(
    @InjectRepository(DailyRate)
    private readonly repository: Repository<DailyRate>
  ) {}

  public save(dailyRate: DailyRate): Promise<DailyRate> {
    return this.repository.save(dailyRate);
  }

  public findDailyRates(page: number): Promise<[DailyRate[], number]> {
    return this.repository
      .createQueryBuilder('dailyRate')
      .select([
        'dailyRate.id',
        'dailyRate.amount',
        'user.id',
        'user.firstName',
        'user.lastName',
        'task.id',
        'task.name',
        'customer.id',
        'customer.name'
      ])
      .innerJoin('dailyRate.user', 'user')
      .innerJoin('dailyRate.task', 'task')
      .innerJoin('dailyRate.customer', 'customer')
      .orderBy('user.lastName', 'ASC')
      .addOrderBy('user.firstName', 'ASC')
      .limit(MAX_ITEMS_PER_PAGE)
      .offset((page - 1) * MAX_ITEMS_PER_PAGE)
      .getManyAndCount();
  }

  public findOneById(id: string): Promise<DailyRate | undefined> {
    return this.repository
      .createQueryBuilder('dailyRate')
      .select([
        'dailyRate.id',
        'dailyRate.amount',
        'user.id',
        'user.firstName',
        'user.lastName',
        'task.id',
        'task.name',
        'customer.id',
        'customer.name'
      ])
      .innerJoin('dailyRate.user', 'user')
      .innerJoin('dailyRate.task', 'task')
      .innerJoin('dailyRate.customer', 'customer')
      .where('dailyRate.id = :id', {id})
      .getOne();
  }

  public findOneByUserCustomerAndTask(
    user: User,
    customer: Customer,
    task: Task
  ): Promise<DailyRate | undefined> {
    return this.repository
      .createQueryBuilder('dailyRate')
      .select('dailyRate.id')
      .where('dailyRate.user = :user', {user: user.getId()})
      .andWhere('dailyRate.customer = :customer', {customer: customer.getId()})
      .andWhere('dailyRate.task = :task', {task: task.getId()})
      .getOne();
  }
}
