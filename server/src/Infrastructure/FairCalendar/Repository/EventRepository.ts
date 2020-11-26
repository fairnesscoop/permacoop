import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {IEventRepository} from 'src/Domain/FairCalendar/Repository/IEventRepository';
import {Event, EventType} from 'src/Domain/FairCalendar/Event.entity';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import { Customer } from 'src/Domain/Customer/Customer.entity';
import { DailyRate } from 'src/Domain/Accounting/DailyRate.entity';
import { Project } from 'src/Domain/Project/Project.entity';

@Injectable()
export class EventRepository implements IEventRepository {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>
  ) {}

  public save(event: Event): Promise<Event> {
    return this.repository.save(event);
  }

  public delete(event: Event): void {
    this.repository.delete(event.getId());
  }

  public async sumOfTimeSpentByUserAndDate(
    user: User,
    date: string
  ): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('event')
      .select('SUM(event.time) as time')
      .where('event.date = :date', {date})
      .andWhere('user.id = :user', {user: user.getId()})
      .innerJoin('event.user', 'user')
      .getRawOne();

    return Number(result.time) || 0;
  }

  public findOneById(id: string): Promise<Event> {
    return this.repository
      .createQueryBuilder('event')
      .select([
        'event.id',
        'event.time',
        'event.summary',
        'event.billable',
        'event.date',
        'event.type',
        'user.id',
        'project.id',
        'project.name',
        'task.id',
        'task.name'
      ])
      .where('event.id = :id', {id})
      .innerJoin('event.user', 'user')
      .leftJoin('event.project', 'project')
      .leftJoin('event.task', 'task')
      .getOne();
  }

  public findMonthlyEvents(date: string, userId: string): Promise<Event[]> {
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();

    return this.repository
      .createQueryBuilder('event')
      .select([
        'event.id',
        'event.time',
        'event.date',
        'event.billable',
        'event.type',
        'project.id',
        'project.name',
        'project.dayDuration',
        'task.id',
        'task.name'
      ])
      .where('user.id = :userId', {userId})
      .andWhere('extract(month FROM event.date) = :month', {month})
      .andWhere('extract(year FROM event.date) = :year', {year})
      .innerJoin('event.user', 'user')
      .leftJoin('event.project', 'project')
      .leftJoin('event.task', 'task')
      .orderBy('event.date', 'ASC')
      .getMany();
  }

  public findBillableEventsByMonthAndProject(date: Date, project: Project): Promise<any[]> {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return this.repository
      .createQueryBuilder('event')
      .select([
        'SUM(event.time) as time_spent',
        'event.billable as billable',
        'task.name as task_name',
        'user.firstName as first_name',
        'user.lastName as last_name'
      ])
      .where('project.id = :id', { id: project.getId() })
      .andWhere('extract(month FROM event.date) = :month', { month })
      .andWhere('extract(year FROM event.date) = :year', { year })
      .andWhere('event.type = :type', { type: EventType.MISSION })
      .addSelect(query => {
        return query
          .select('dailyRate.amount')
          .from(DailyRate, 'dailyRate')
          .where('d_user.id = user.id')
          .andWhere('d_task.id = task.id')
          .andWhere('d_customer.id = customer.id')
          .innerJoin('dailyRate.user', 'd_user')
          .innerJoin('dailyRate.task', 'd_task')
          .innerJoin('dailyRate.customer', 'd_customer')
      }, 'amount')
      .innerJoin('event.project', 'project')
      .innerJoin('event.user', 'user')
      .innerJoin('event.task', 'task')
      .innerJoin('project.customer', 'customer')
      .groupBy('user.id, customer.id, event.time, task.id, event.billable')
      .getRawMany();
  }

  public async countEventsByUserAndPeriod(
    user: User,
    startDate: string,
    endDate: string
  ): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('event')
      .select('count(event.id) as id')
      .where('user.id = :id', {id: user.getId()})
      .andWhere('event.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate
      })
      .innerJoin('event.user', 'user')
      .getRawOne();

    return Number(result.id) || 0;
  }
}
