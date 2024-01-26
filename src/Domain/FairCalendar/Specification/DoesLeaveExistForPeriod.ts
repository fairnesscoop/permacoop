import { Inject } from '@nestjs/common';
import { IEventRepository } from '../Repository/IEventRepository';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { ILeaveRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRepository';

export class DoesLeaveExistForPeriod {
  constructor(
    @Inject('ILeaveRepository')
    private readonly leaveRepository: ILeaveRepository
  ) {}

  public async isSatisfiedBy(
    user: User,
    startDate: string,
    endDate: string
  ): Promise<boolean> {
    const leaves = await this.leaveRepository.countLeavesByUserAndPeriod(
      user,
      startDate,
      endDate
    );

    return leaves > 0;
  }
}
