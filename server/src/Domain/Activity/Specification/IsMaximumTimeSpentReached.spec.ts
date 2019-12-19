import {instance, mock, when, verify} from 'ts-mockito';
import {ActivityRepository} from 'src/Infrastructure/Activity/Repository/ActivityRepository';
import {IsMaximumTimeSpentReached} from './IsMaximumTimeSpentReached';
import {Activity} from '../Activity.entity';
import {User} from 'src/Domain/User/User.entity';

describe('IsMaximumTimeSpentReached', () => {
  let activityRepository: ActivityRepository;
  let isMaximumTimeSpentReached: IsMaximumTimeSpentReached;

  beforeEach(() => {
    activityRepository = mock(ActivityRepository);
    isMaximumTimeSpentReached = new IsMaximumTimeSpentReached(
      instance(activityRepository)
    );
  });

  it('testMaximumTimeSpentNotReached', async () => {
    const user = mock(User);
    const activity = mock(Activity);
    const date = new Date();

    when(activity.getUser()).thenReturn(instance(user));
    when(activity.getDate()).thenReturn(date);
    when(activity.getTime()).thenReturn(50);
    when(
      activityRepository.getTimeSpentSumByUserAndDate(instance(user), date)
    ).thenResolve(50);

    expect(
      await isMaximumTimeSpentReached.isSatisfiedBy(instance(activity))
    ).toBe(false);

    verify(activity.getUser()).once();
    verify(activity.getDate()).once();
    verify(activity.getTime()).once();
    verify(
      activityRepository.getTimeSpentSumByUserAndDate(instance(user), date)
    ).once();
  });

  it('testMaximumTimeSpentReached', async () => {
    const user = mock(User);
    const activity = mock(Activity);
    const date = new Date();

    when(activity.getUser()).thenReturn(instance(user));
    when(activity.getDate()).thenReturn(date);
    when(activity.getTime()).thenReturn(50);
    when(
      activityRepository.getTimeSpentSumByUserAndDate(instance(user), date)
    ).thenResolve(75);

    expect(
      await isMaximumTimeSpentReached.isSatisfiedBy(instance(activity))
    ).toBe(true);

    verify(activity.getUser()).once();
    verify(activity.getDate()).once();
    verify(activity.getTime()).once();
    verify(
      activityRepository.getTimeSpentSumByUserAndDate(instance(user), date)
    ).once();
  });
});
