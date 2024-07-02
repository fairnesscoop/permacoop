import { mock, instance, when } from 'ts-mockito';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LeaveRequest, Status } from '../LeaveRequest.entity';
import { CanLeaveRequestBeCancelled } from './CanLeaveRequestBeCancelled';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';

describe('CanLeaveRequestBeCancelled', () => {
  let canLeaveRequestBeCancelled: CanLeaveRequestBeCancelled;
  const user = mock(User);
  const leaveRequest = mock(LeaveRequest);
  const dateUtils = mock(DateUtilsAdapter);

  beforeEach(() => {
    canLeaveRequestBeCancelled = new CanLeaveRequestBeCancelled(
      instance(dateUtils)
    );
  });

  it('testCanBeCancelled', async () => {
    when(user.getId()).thenReturn('cfdd06eb-cd71-44b9-82c6-46110b30ce05');
    when(leaveRequest.getUserId()).thenReturn(
      'cfdd06eb-cd71-44b9-82c6-46110b30ce05'
    );
    when(leaveRequest.getStartDate()).thenReturn('2020-05-05');
    when(dateUtils.getCurrentDate()).thenReturn(new Date('2020-04-05'));

    expect(
      await canLeaveRequestBeCancelled.isSatisfiedBy(
        instance(user),
        instance(leaveRequest)
      )
    ).toBe(true);
  });

  it('testCannotBeCancelledDifferentUser', async () => {
    when(user.getId()).thenReturn('cfdd06eb-cd71-44b9-82c6-46110b30ce05');
    when(leaveRequest.getUserId()).thenReturn(
      'abb9697a-dc04-4b8c-a757-ad3da0995676'
    );
    when(leaveRequest.getStartDate()).thenReturn('2020-05-05');
    when(dateUtils.getCurrentDate()).thenReturn(new Date('2020-04-05'));

    expect(
      await canLeaveRequestBeCancelled.isSatisfiedBy(
        instance(user),
        instance(leaveRequest)
      )
    ).toBe(false);
  });

  it('testCannotBeCancelledIsPast', async () => {
    when(user.getId()).thenReturn('cfdd06eb-cd71-44b9-82c6-46110b30ce05');
    when(leaveRequest.getUserId()).thenReturn(
      'cfdd06eb-cd71-44b9-82c6-46110b30ce05'
    );
    when(leaveRequest.getStartDate()).thenReturn('2020-05-05');
    when(dateUtils.getCurrentDate()).thenReturn(new Date('2020-06-05'));

    expect(
      await canLeaveRequestBeCancelled.isSatisfiedBy(
        instance(user),
        instance(leaveRequest)
      )
    ).toBe(false);
  });
});
