import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { GetPendingLeaveRequestsCountQuery } from './GetPendingLeaveRequestsCountQuery';
import { ILeaveRequestRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRequestRepository';

@QueryHandler(GetPendingLeaveRequestsCountQuery)
export class GetPendingLeaveRequestsCountQueryHandler {
  constructor(
    @Inject('ILeaveRequestRepository')
    private readonly leaveRequestRepository: ILeaveRequestRepository
  ) {}

  public async execute(_: GetPendingLeaveRequestsCountQuery): Promise<number> {
    return await this.leaveRequestRepository.getPendingCount();
  }
}
