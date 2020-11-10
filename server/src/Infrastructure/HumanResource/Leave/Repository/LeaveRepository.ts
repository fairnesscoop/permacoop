import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILeaveRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRepository';
import { Leave } from 'src/Domain/HumanResource/Leave/Leave.entity';

export class LeaveRepository implements ILeaveRepository {
  constructor(
    @InjectRepository(Leave)
    private readonly repository: Repository<Leave>
  ) {}

  public save(leaves: Leave[]): void {
    this.repository.save(leaves);
  }

  public findMonthlyLeaves(date: string, userId: string): Promise<Leave[]> {
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();

    return this.repository
      .createQueryBuilder('leave')
      .select([
        'leave.time',
        'leave.date',
        'leaveRequest.type',
      ])
      .where('user.id = :userId', { userId })
      .andWhere('extract(month FROM leave.date) = :month', { month })
      .andWhere('extract(year FROM leave.date) = :year', { year })
      .innerJoin('leave.leaveRequest', 'leaveRequest')
      .innerJoin('leaveRequest.user', 'user')
      .orderBy('leave.date', 'ASC')
      .getMany();
  }
}
