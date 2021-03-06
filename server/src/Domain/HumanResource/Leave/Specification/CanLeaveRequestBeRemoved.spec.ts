import { mock, instance, when } from 'ts-mockito';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LeaveRequest } from '../LeaveRequest.entity';
import { CanLeaveRequestBeRemoved } from './CanLeaveRequestBeRemoved';

describe('CanLeaveRequestBeRemoved', () => {
  let canLeaveRequestBeRemoved: CanLeaveRequestBeRemoved;
  const user = mock(User);
  const leaveRequest = mock(LeaveRequest);
  const owner = mock(User);

  beforeEach(() => {
    canLeaveRequestBeRemoved = new CanLeaveRequestBeRemoved();
  });

  it('testLeaveRequestCantBeRemoved', async () => {
    when(user.getId()).thenReturn('cfdd06eb-cd71-44b9-82c6-46110b30ce05');
    when(owner.getId()).thenReturn('50e624ef-3609-4053-a437-f74844a2d2de');
    when(leaveRequest.getUser()).thenReturn(instance(user));

    expect(
      await canLeaveRequestBeRemoved.isSatisfiedBy(
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
      await canLeaveRequestBeRemoved.isSatisfiedBy(
        instance(leaveRequest),
        instance(owner)
      )
    ).toBe(true);
  });
});
