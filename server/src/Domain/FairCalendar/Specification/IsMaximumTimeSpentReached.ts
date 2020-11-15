import { Inject } from '@nestjs/common';
import { IEventRepository } from '../Repository/IEventRepository';
import { Event } from '../Event.entity';

export class IsMaximumTimeSpentReached {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository
  ) {}

  public async isSatisfiedBy(event: Event, newTime: number = 0): Promise<boolean> {
    const timeSpent = await this.eventRepository.getDayTimeSpentByUser(
      event.getUser(),
      event.getDate()
    );

    const time = event.getId() ?
      timeSpent - event.getTime() + newTime : timeSpent + event.getTime()

    return time > Event.MAXIMUM_TIMESPENT_PER_DAY
  }
}
