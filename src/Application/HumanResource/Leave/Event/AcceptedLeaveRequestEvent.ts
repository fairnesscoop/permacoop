import { IEvent } from 'src/Application/IEvent';
import { LeaveRequest } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';

export class AcceptedLeaveRequestEvent implements IEvent {
  constructor(public readonly leaveRequest: LeaveRequest) {}
}
