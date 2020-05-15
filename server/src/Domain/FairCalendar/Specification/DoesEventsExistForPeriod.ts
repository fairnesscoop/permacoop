import {Inject} from '@nestjs/common';
import {IEventRepository} from '../Repository/IEventRepository';
import {User} from 'src/Domain/HumanResource/User/User.entity';

export class DoesEventsExistForPeriod {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository
  ) {}

  public async isSatisfiedBy(
    user: User,
    startDate: string,
    endDate: string
  ): Promise<boolean> {
    return (
      (await this.eventRepository.countExistingEventsByUserAndPeriod(
        user,
        startDate,
        endDate
      )) > 0
    );
  }
}
