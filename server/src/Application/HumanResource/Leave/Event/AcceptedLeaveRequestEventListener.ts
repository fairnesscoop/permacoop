import { EventsHandler } from '@nestjs/cqrs';
import { AcceptedLeaveRequestEvent } from './AcceptedLeaveRequestEvent';
import { LeaveRequestToLeavesConverter } from 'src/Domain/HumanResource/Leave/Converter/LeaveRequestToLeavesConverter';
import { LeaveRequestToMealTicketRemovalConverter } from 'src/Domain/HumanResource/MealTicket/Converter/LeaveRequestToMealTicketRemovalConverter';

@EventsHandler(AcceptedLeaveRequestEvent)
export class AcceptedLeaveRequestEventListener {
  constructor(
    private readonly leaveRequestToLeavesConverter: LeaveRequestToLeavesConverter,
    private readonly leaveRequestToMealTicketRemovalConverter: LeaveRequestToMealTicketRemovalConverter
  ) {}

  public handle(event: AcceptedLeaveRequestEvent): void {
    this.leaveRequestToLeavesConverter.convert(event.leaveRequest);
    this.leaveRequestToMealTicketRemovalConverter.convert(event.leaveRequest);
  }
}
