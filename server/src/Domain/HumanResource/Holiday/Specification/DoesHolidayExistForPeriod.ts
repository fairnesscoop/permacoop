import {Inject} from '@nestjs/common';
import {User} from '../../User/User.entity';
import {IHolidayRepository} from '../Repository/IHolidayRepository';
import {Holiday} from '../Holiday.entity';

export class DoesHolidayExistForPeriod {
  constructor(
    @Inject('IHolidayRepository')
    private readonly holidayRepository: IHolidayRepository
  ) {}

  public async isSatisfiedBy(
    user: User,
    startDate: string,
    endDate: string
  ): Promise<boolean> {
    return (
      (await this.holidayRepository.findExistingHolidaysByUserAndPeriod(
        user,
        startDate,
        endDate
      )) instanceof Holiday
    );
  }
}
