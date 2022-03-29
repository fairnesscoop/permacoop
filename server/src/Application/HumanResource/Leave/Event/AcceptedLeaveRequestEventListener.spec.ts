import { mock, instance, verify } from 'ts-mockito';
import { LeaveRequestToLeavesConverter } from 'src/Domain/HumanResource/Leave/Converter/LeaveRequestToLeavesConverter';
import { LeaveRequest } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { AcceptedLeaveRequestEvent } from './AcceptedLeaveRequestEvent';
import { AcceptedLeaveRequestEventListener } from './AcceptedLeaveRequestEventListener';
import { LeaveRequestToMealTicketRemovalConverter } from 'src/Domain/HumanResource/MealTicket/Converter/LeaveRequestToMealTicketRemovalConverter';

describe('AcceptedLeaveRequestEventListener', () => {
  it('testAcceptedLeaveRequest', async () => {
    const leaveRequest = mock(LeaveRequest);
    const leaveRequestToLeavesConverter = mock(LeaveRequestToLeavesConverter);
    const leaveRequestToMealTicketRemovalConverter = mock(LeaveRequestToMealTicketRemovalConverter);
    const acceptedLeaveEventListener = new AcceptedLeaveRequestEventListener(
      instance(leaveRequestToLeavesConverter),
      instance(leaveRequestToMealTicketRemovalConverter),
    );

    await acceptedLeaveEventListener.handle(
      new AcceptedLeaveRequestEvent(instance(leaveRequest))
    );

    verify(
      leaveRequestToLeavesConverter.convert(instance(leaveRequest))
    ).once();
    verify(
      leaveRequestToMealTicketRemovalConverter.convert(instance(leaveRequest))
    ).once();
  });
});
