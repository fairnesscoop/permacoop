import { mock, instance, when } from 'ts-mockito';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LeaveRequest, Status } from '../LeaveRequest.entity';
import { CanLeaveRequestBeModerated } from './CanLeaveRequestBeModerated';

describe('CanLeaveRequestBeModerated', () => {
  let canLeaveRequestBeModerated: CanLeaveRequestBeModerated;
  const user = mock(User);
  const leaveRequest = mock(LeaveRequest);
  const moderator = mock(User);

  beforeEach(() => {
    canLeaveRequestBeModerated = new CanLeaveRequestBeModerated();
  });

  it('testLeaveRequestCanBeRefused', async () => {
    when(user.getId()).thenReturn('cfdd06eb-cd71-44b9-82c6-46110b30ce05');
    when(moderator.getId()).thenReturn('50e624ef-3609-4053-a437-f74844a2d2de');
    when(leaveRequest.getUser()).thenReturn(instance(user));
    when(leaveRequest.getStatus()).thenReturn(Status.PENDING);

    expect(
      await canLeaveRequestBeModerated.isSatisfiedBy(
        instance(leaveRequest),
        instance(moderator)
      )
    ).toBe(true);
  });

  it('testLeaveRequestCantBeRefused', async () => {
    when(user.getId()).thenReturn('cfdd06eb-cd71-44b9-82c6-46110b30ce05');
    when(moderator.getId()).thenReturn('50e624ef-3609-4053-a437-f74844a2d2de');
    when(leaveRequest.getUser()).thenReturn(instance(user));
    when(leaveRequest.getStatus()).thenReturn(Status.ACCEPTED);

    expect(
      await canLeaveRequestBeModerated.isSatisfiedBy(
        instance(leaveRequest),
        instance(moderator)
      )
    ).toBe(false);
  });
});
