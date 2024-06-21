import { mock, instance, when } from 'ts-mockito';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LeaveRequest } from '../LeaveRequest.entity';
import { DoesLeaveRequestBelongToUser } from './DoesLeaveRequestBelongToUser';

describe('DoesLeaveRequestBelongToUser', () => {
  let doesLeaveRequestBelongToUser: DoesLeaveRequestBelongToUser;
  const leaveRequest = mock(LeaveRequest);
  const owner = mock(User);

  beforeEach(() => {
    doesLeaveRequestBelongToUser = new DoesLeaveRequestBelongToUser();
  });

  it('testLeaveRequestCantBeRemoved', async () => {
    when(owner.getId()).thenReturn('50e624ef-3609-4053-a437-f74844a2d2de');
    when(leaveRequest.getUserId()).thenReturn(
      'cfdd06eb-cd71-44b9-82c6-46110b30ce05'
    );

    expect(
      await doesLeaveRequestBelongToUser.isSatisfiedBy(
        instance(leaveRequest),
        instance(owner)
      )
    ).toBe(false);
  });

  it('testLeaveRequestCanBeRemoved', async () => {
    when(owner.getId()).thenReturn('cfdd06eb-cd71-44b9-82c6-46110b30ce05');
    when(leaveRequest.getUserId()).thenReturn(
      'cfdd06eb-cd71-44b9-82c6-46110b30ce05'
    );

    expect(
      await doesLeaveRequestBelongToUser.isSatisfiedBy(
        instance(leaveRequest),
        instance(owner)
      )
    ).toBe(true);
  });
});
