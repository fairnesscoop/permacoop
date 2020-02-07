import {instance, mock, when, verify} from 'ts-mockito';
import {Activity} from '../Activity.entity';
import {User} from 'src/Domain/User/User.entity';
import {IsActivityDeletable} from './IsActivityDeletable';
import {LoggedUserAdapter} from 'src/Infrastructure/Adapter/LoggedUserAdapter';

describe('IsActivityDeletable', () => {
  let loggedUser: LoggedUserAdapter;
  let isActivityDeletable: IsActivityDeletable;

  beforeEach(() => {
    loggedUser = mock(LoggedUserAdapter);
    isActivityDeletable = new IsActivityDeletable(instance(loggedUser));
  });

  it('testActivityIsDeletable', async () => {
    const user = mock(User);
    const activity = mock(Activity);

    when(user.getId()).thenReturn('bba8403c-a1ba-41c8-83bc-cea5978a93b8');
    when(loggedUser.get()).thenResolve(instance(user));
    when(activity.getUser()).thenReturn(instance(user));

    expect(await isActivityDeletable.isSatisfiedBy(instance(activity))).toBe(
      true
    );

    // As the user is the same, the getId() on it is called twice.
    verify(user.getId()).twice();
    verify(activity.getUser()).once();
    verify(loggedUser.get()).once();
  });

  it('testActivityIsNotDeletable', async () => {
    const user = mock(User);
    const activityUser = mock(User);
    const activity = mock(Activity);

    when(user.getId()).thenReturn('bba8403c-a1ba-41c8-83bc-cea5978a93b8');
    when(activityUser.getId()).thenReturn(
      'bba8403c-a1ba-41c8-83bc-cea5978a93b9'
    );
    when(loggedUser.get()).thenResolve(instance(user));
    when(activity.getUser()).thenReturn(instance(activityUser));

    expect(await isActivityDeletable.isSatisfiedBy(instance(activity))).toBe(
      false
    );

    verify(user.getId()).once();
    verify(activityUser.getId()).once();
    verify(activity.getUser()).once();
    verify(loggedUser.get()).once();
  });

  it('testActivityWithUserNotFound', async () => {
    const activity = mock(Activity);

    when(loggedUser.get()).thenResolve(null);

    expect(await isActivityDeletable.isSatisfiedBy(instance(activity))).toBe(
      false
    );

    verify(activity.getUser()).never();
    verify(loggedUser.get()).once();
  });
});
