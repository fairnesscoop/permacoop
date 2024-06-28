import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILeaveRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRepository';
import { Leave } from 'src/Domain/HumanResource/Leave/Leave.entity';
import { User, UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { IDateUtils } from 'src/Application/IDateUtils';
import { Type } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';

export class LeaveRepository implements ILeaveRepository {
  constructor(
    @InjectRepository(Leave)
    private readonly repository: Repository<Leave>,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils
  ) {}

  public save(leaves: Leave[]): void {
    this.repository.save(leaves);
  }

  public findMonthlyLeaves(date: string, userId: string): Promise<Leave[]> {
    const { month, year } = this.dateUtils.getMonth(new Date(date));

    return this.repository
      .createQueryBuilder('leave')
      .select(['leave.time', 'leave.date', 'leaveRequest.type'])
      .where('user.id = :userId', { userId })
      .andWhere('extract(month FROM leave.date) = :month', { month })
      .andWhere('extract(year FROM leave.date) = :year', { year })
      .innerJoin('leave.leaveRequest', 'leaveRequest')
      .innerJoin('leaveRequest.user', 'user')
      .orderBy('leave.date', 'ASC')
      .getMany();
  }

  public async countLeavesByUserAndPeriod(
    user: User,
    startDate: string,
    endDate: string
  ): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('leave')
      .select('count(leave.id) as id')
      .where('user.id = :id', { id: user.getId() })
      .andWhere('leave.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate
      })
      .innerJoin('leave.leaveRequest', 'leaveRequest')
      .innerJoin('leaveRequest.user', 'user')
      .getRawOne();

    return Number(result.id) || 0;
  }

  public async sumOfDurationLeaveByUserAndDate(
    user: User,
    date: string
  ): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('leave')
      .select('SUM(leave.time) as time')
      .where('leave.date = :date', { date })
      .andWhere('user.id = :user', { user: user.getId() })
      .innerJoin('leave.leaveRequest', 'leaveRequest')
      .innerJoin('leaveRequest.user', 'user')
      .getRawOne();

    return Number(result.time) || 0;
  }

  public async getSumOfPaidLeaveDurationsBetween(
    startDate: Date,
    endDate: Date,
    userId: string
  ): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('leave')
      .select('SUM(leave.time) as time')
      .innerJoin('leave.leaveRequest', 'leaveRequest')
      .innerJoin('leaveRequest.user', 'user')
      .where('leave.date >= :startDate', { startDate })
      .andWhere('leave.date < :endDate', { endDate })
      .andWhere('leaveRequest.type = :type', { type: Type.PAID })
      .andWhere('user.id = :userId', { userId: userId })
      .getRawOne();

    return Number(result.time) || 0;
  }
}
