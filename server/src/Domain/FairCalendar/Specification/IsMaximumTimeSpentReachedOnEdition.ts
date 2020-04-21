import {Inject} from '@nestjs/common';
import {IEventRepository} from '../Repository/IEventRepository';
import {Event} from '../Event.entity';

export class IsMaximumTimeSpentReachedOnEdition {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository
  ) {}

  public async isSatisfiedBy(event: Event, newTime: number): Promise<boolean> {
    const timeSpent = await this.eventRepository.getDayTimeSpentByUser(
      event.getUser(),
      event.getDate()
    );

    return (
      timeSpent - event.getTime() + newTime > Event.MAXIMUM_TIMESPENT_PER_DAY
    );
  }
}
