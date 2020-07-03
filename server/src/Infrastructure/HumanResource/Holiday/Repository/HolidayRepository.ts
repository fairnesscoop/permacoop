import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {IHolidayRepository} from 'src/Domain/HumanResource/Holiday/Repository/IHolidayRepository';
import {
  Holiday,
  HolidayStatus
} from 'src/Domain/HumanResource/Holiday/Holiday.entity';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {MAX_ITEMS_PER_PAGE} from 'src/Application/Common/Pagination';

export class HolidayRepository implements IHolidayRepository {
  constructor(
    @InjectRepository(Holiday)
    private readonly repository: Repository<Holiday>
  ) {}

  public save(holiday: Holiday): Promise<Holiday> {
    return this.repository.save(holiday);
  }

  public findOneById(id: string): Promise<Holiday | undefined> {
    return this.repository
      .createQueryBuilder('holiday')
      .select(['holiday.id', 'holiday.status', 'user.id'])
      .where('holiday.id = :id', {id})
      .innerJoin('holiday.user', 'user')
      .getOne();
  }

  public findOneDetailById(id: string): Promise<Holiday | undefined> {
    return this.repository
      .createQueryBuilder('holiday')
      .select([
        'holiday.id',
        'holiday.status',
        'holiday.leaveType',
        'holiday.startdate',
        'holiday.endDate',
        'holiday.duration',
        'user.id',
        'user.firstName',
        'user.lastName'
      ])
      .where('holiday.id = :id', {id})
      .innerJoin('holiday.user', 'user')
      .getOne();
  }

  public findExistingHolidaysByUserAndPeriod(
    user: User,
    startDate: string,
    endDate: string
  ): Promise<Holiday | undefined> {
    return this.repository
      .createQueryBuilder('holiday')
      .select('holiday.id')
      .where('holiday.user = :id', {id: user.getId()})
      .andWhere(
        '(holiday.startDate BETWEEN :startDate AND :endDate OR holiday.endDate BETWEEN :startDate AND :endDate)',
        {
          startDate,
          endDate
        }
      )
      .andWhere('(holiday.status = :accepted OR holiday.status = :pending)', {
        accepted: HolidayStatus.ACCEPTED,
        pending: HolidayStatus.PENDING
      })
      .getOne();
  }

  public findHolidays(page: number): Promise<[Holiday[], number]> {
    return this.repository
      .createQueryBuilder('holiday')
      .select([
        'holiday.id',
        'holiday.leaveType',
        'holiday.status',
        'holiday.startDate',
        'holiday.startsAllDay',
        'holiday.endDate',
        'holiday.endsAllDay',
        'user.id',
        'user.firstName',
        'user.lastName'
      ])
      .innerJoin('holiday.user', 'user')
      .orderBy('holiday.startDate', 'ASC')
      .limit(MAX_ITEMS_PER_PAGE)
      .offset((page - 1) * MAX_ITEMS_PER_PAGE)
      .getManyAndCount();
  }
}
