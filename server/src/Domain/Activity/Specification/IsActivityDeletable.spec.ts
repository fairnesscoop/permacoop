import {instance, mock, when, verify} from 'ts-mockito';
import {Activity} from '../Activity.entity';
import {User} from 'src/Domain/User/User.entity';
import {IsActivityDeletable} from "./IsActivityDeletable";

describe('IsActivityDeletable', () => {
  let isActivityDeletable: IsActivityDeletable;

  beforeEach(() => {
    isActivityDeletable = new IsActivityDeletable(
    );
  });

  it('testMaximumTimeSpentNotReached', () => {
    expect(
      isActivityDeletable.isSatisfiedBy()
    ).toBe(true);
  });

  it('testMaximumTimeSpentReached', async () => {
    const user = mock(User);
    const activity = mock(Activity);

    when(activity.getUser()).thenReturn(instance(user));
    when(activity.getDate()).thenReturn('2019-01-01');
    when(activity.getTime()).thenReturn(50);
    when(
      activityRepository.getTimeSpentSumByUserAndDate(
        instance(user),
        '2019-01-01'
      )
    ).thenResolve(75);

    expect(
      await isMaximumTimeSpentReached.isSatisfiedBy(instance(activity))
    ).toBe(true);

    verify(activity.getUser()).once();
    verify(activity.getDate()).once();
    verify(activity.getTime()).once();
    verify(
      activityRepository.getTimeSpentSumByUserAndDate(
        instance(user),
        '2019-01-01'
      )
    ).once();
  });
});
