import { mock, instance, verify } from 'ts-mockito';
import { LeaveRequestToLeavesConverter } from 'src/Domain/HumanResource/Leave/Converter/LeaveRequestToLeavesConverter';
import { LeaveRequest } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { AcceptedLeaveRequestEvent } from './AcceptedLeaveRequestEvent';
import { AcceptedLeaveRequestEventListener } from './AcceptedLeaveRequestEventListener';

describe('AcceptedLeaveRequestEventListener', () => {
  it('testAcceptedLeaveRequest', async () => {
    const leaveRequest = mock(LeaveRequest);
    const leaveRequestToLeavesConverter = mock(LeaveRequestToLeavesConverter);
    const acceptedLeaveEventListener = new AcceptedLeaveRequestEventListener(
      instance(leaveRequestToLeavesConverter)
    );

    await acceptedLeaveEventListener.handle(
      new AcceptedLeaveRequestEvent(instance(leaveRequest))
    );

    verify(leaveRequestToLeavesConverter.convert(instance(leaveRequest))).once();
  });
});
