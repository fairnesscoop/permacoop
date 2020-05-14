import {Holiday} from '../Holiday.entity';
import {User} from '../../User/User.entity';

export interface IHolidayRepository {
  save(holiday: Holiday): Promise<Holiday>;
  findOneById(id: string): Promise<Holiday | undefined>;
  findHolidays(): Promise<Holiday[]>;
  findExistingHolidaysByUserAndPeriod(
    user: User,
    startDate: string,
    endDate: string
  ): Promise<Holiday | undefined>;
}
