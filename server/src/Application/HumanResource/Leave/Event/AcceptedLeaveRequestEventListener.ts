import { EventsHandler } from '@nestjs/cqrs';
import { AcceptedLeaveRequestEvent } from './AcceptedLeaveRequestEvent';
import { LeaveRequestToLeavesConverter } from 'src/Domain/HumanResource/Leave/Converter/LeaveRequestToLeavesConverter';

@EventsHandler(AcceptedLeaveRequestEvent)
export class AcceptedLeaveRequestEventListener {
  constructor(
    private readonly leaveRequestToLeavesConverter: LeaveRequestToLeavesConverter
  ) {}

  public handle(event: AcceptedLeaveRequestEvent): void {
    this.leaveRequestToLeavesConverter.convert(event.leaveRequest);
  }
}
