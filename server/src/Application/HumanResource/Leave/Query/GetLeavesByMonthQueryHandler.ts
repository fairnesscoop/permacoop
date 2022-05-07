import { Inject } from '@nestjs/common';
import { LeavesCollection } from 'src/Domain/HumanResource/Leave/LeavesCollection';
import { ILeaveRequestRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRequestRepository';

import { GetLeavesByMonthQuery } from './GetLeavesByMonthQuery';

export class GetLeavesByMonthQueryHandler {
  constructor(
    @Inject('ILeaveRequestRepository')
    private readonly leaveRequestRepository: ILeaveRequestRepository
  ) {}

  async execute(query: GetLeavesByMonthQuery): Promise<LeavesCollection> {
    const leaves = await this.leaveRequestRepository.findAcceptedLeaveRequestsByMonth(
      query.date
    );

    return new LeavesCollection(leaves);
  }
}
