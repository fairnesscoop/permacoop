import {Injectable, Inject} from '@nestjs/common';
import {ISpecification} from 'src/Domain/ISpecification';
import {IActivityRepository} from '../Repository/IActivityRepository';
import {Activity} from '../Activity.entity';

@Injectable()
export class IsMaximumTimeSpentReached implements ISpecification {
  constructor(
    @Inject('IActivityRepository')
    private readonly activityRepository: IActivityRepository
  ) {}

  public async isSatisfiedBy(activity: Activity): Promise<boolean> {
    const timeSpent = await this.activityRepository.getTimeSpentSumByUserAndDate(
      activity.getUser(),
      activity.getDate()
    );

    return timeSpent + activity.getTime() > Activity.MAXIMUM_TIMESPENT_PER_DAY;
  }
}
