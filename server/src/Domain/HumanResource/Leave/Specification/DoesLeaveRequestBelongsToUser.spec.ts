import { mock, instance, when } from 'ts-mockito';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LeaveRequest } from '../LeaveRequest.entity';
import { DoesLeaveRequestBelongsToUser } from './DoesLeaveRequestBelongsToUser';

describe('DoesLeaveRequestBelongsToUser', () => {
  let doesLeaveRequestBelongsToUser: DoesLeaveRequestBelongsToUser;
  const user = mock(User);
  const leaveRequest = mock(LeaveRequest);
  const owner = mock(User);

  beforeEach(() => {
    doesLeaveRequestBelongsToUser = new DoesLeaveRequestBelongsToUser();
  });

  it('testLeaveRequestCantBeRemoved', async () => {
    when(user.getId()).thenReturn('cfdd06eb-cd71-44b9-82c6-46110b30ce05');
    when(owner.getId()).thenReturn('50e624ef-3609-4053-a437-f74844a2d2de');
    when(leaveRequest.getUser()).thenReturn(instance(user));

    expect(
      await doesLeaveRequestBelongsToUser.isSatisfiedBy(
        instance(leaveRequest),
        instance(owner)
      )
    ).toBe(false);
  });

  it('testLeaveRequestCanBeRemoved', async () => {
    when(user.getId()).thenReturn('cfdd06eb-cd71-44b9-82c6-46110b30ce05');
    when(owner.getId()).thenReturn('cfdd06eb-cd71-44b9-82c6-46110b30ce05');
    when(leaveRequest.getUser()).thenReturn(instance(user));

    expect(
      await doesLeaveRequestBelongsToUser.isSatisfiedBy(
        instance(leaveRequest),
        instance(owner)
      )
    ).toBe(true);
  });
});
