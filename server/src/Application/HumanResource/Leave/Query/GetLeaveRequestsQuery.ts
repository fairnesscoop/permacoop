import { IQuery } from 'src/Application/IQuery';
import { Status } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';

export class GetLeaveRequestsQuery implements IQuery {
  constructor(
    public readonly currentUserId: string,
    public readonly page: number,
    public readonly status: Status = null,
    public readonly limit: number = null
  ) {}
}
