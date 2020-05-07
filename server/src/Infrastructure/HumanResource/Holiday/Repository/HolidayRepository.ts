import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {IHolidayRepository} from 'src/Domain/HumanResource/Holiday/Repository/IHolidayRepository';
import {
  Holiday,
  HolidayStatus
} from 'src/Domain/HumanResource/Holiday/Holiday.entity';
import {User} from 'src/Domain/HumanResource/User/User.entity';

export class HolidayRepository implements IHolidayRepository {
  constructor(
    @InjectRepository(Holiday)
    private readonly repository: Repository<Holiday>
  ) {}

  public save(holiday: Holiday): Promise<Holiday> {
    return this.repository.save(holiday);
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
}
