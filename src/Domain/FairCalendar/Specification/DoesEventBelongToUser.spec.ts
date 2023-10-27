import { instance, mock, when } from 'ts-mockito';
import { DoesEventBelongToUser } from './DoesEventBelongToUser';
import { Event } from '../Event.entity';
import { User } from 'src/Domain/HumanResource/User/User.entity';

describe('DoesEventBelongToUser', () => {
  let doesEventBelongToUser: DoesEventBelongToUser;

  beforeEach(() => {
    doesEventBelongToUser = new DoesEventBelongToUser();
  });

  it('testEventNotBelongToUser', async () => {
    const user = mock(User);
    const otherUser = mock(User);
    const event = mock(Event);

    when(user.getId()).thenReturn('d8705a30-e626-4d99-b6a0-af0c239e5163');
    when(otherUser.getId()).thenReturn('cadd8a80-63ba-4030-8a69-2aadd861630c');
    when(event.getUser()).thenReturn(instance(otherUser));

    expect(
      await doesEventBelongToUser.isSatisfiedBy(instance(event), instance(user))
    ).toBe(false);
  });

  it('testMaximumTimeSpentReached', async () => {
    const user = mock(User);
    const event = mock(Event);

    when(user.getId()).thenReturn('d8705a30-e626-4d99-b6a0-af0c239e5163');
    when(event.getUser()).thenReturn(instance(user));

    expect(
      await doesEventBelongToUser.isSatisfiedBy(instance(event), instance(user))
    ).toBe(true);
  });
});
