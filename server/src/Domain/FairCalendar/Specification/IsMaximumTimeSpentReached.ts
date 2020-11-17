import { Inject } from '@nestjs/common';
import { IEventRepository } from '../Repository/IEventRepository';
import { Event } from '../Event.entity';
import { ILeaveRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRepository';

export class IsMaximumTimeSpentReached {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
    @Inject('ILeaveRepository')
    private readonly leaveRepository: ILeaveRepository
  ) {}

  public async isSatisfiedBy(event: Event, newTime: number = 0): Promise<boolean> {
    const user = event.getUser();
    const date = event.getDate();

    const [eventTime, leaveTime] = await Promise.all([
      this.eventRepository.sumOfTimeSpentByUserAndDate(user, date),
      this.leaveRepository.sumOfDurationLeaveByUserAndDate(user, date)
    ]);

    const timeSpent = eventTime + leaveTime;
    const dayTime = event.getId() ?
      timeSpent - event.getTime() + newTime : timeSpent + event.getTime()

    return dayTime > Event.MAXIMUM_TIMESPENT_PER_DAY
  }
}
