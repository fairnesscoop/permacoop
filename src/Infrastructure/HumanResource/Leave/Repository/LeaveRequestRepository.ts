import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILeaveRequestRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRequestRepository';
import { MAX_ITEMS_PER_PAGE } from 'src/Application/Common/Pagination';
import {
  LeaveRequest,
  Status
} from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { IDateUtils } from 'src/Application/IDateUtils';
import { Inject } from '@nestjs/common';
import { MonthDate } from 'src/Application/Common/MonthDate';

export class LeaveRequestRepository implements ILeaveRequestRepository {
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly repository: Repository<LeaveRequest>,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils
  ) {}

  public save(leaveRequest: LeaveRequest): Promise<LeaveRequest> {
    return this.repository.save(leaveRequest);
  }

  public remove(leaveRequest: LeaveRequest): void {
    this.repository.delete(leaveRequest.getId());
  }

  public findOneById(id: string): Promise<LeaveRequest | undefined> {
    return this.repository
      .createQueryBuilder('leaveRequest')
      .select([
        'leaveRequest.id',
        'leaveRequest.type',
        'leaveRequest.status',
        'leaveRequest.startDate',
        'leaveRequest.startsAllDay',
        'leaveRequest.endDate',
        'leaveRequest.endsAllDay',
        'leaveRequest.comment',
        'leaveRequest.moderateAt',
        'leaveRequest.moderationComment',
        'user.id',
        'user.firstName',
        'user.lastName',
        'moderator.id',
        'moderator.firstName',
        'moderator.lastName'
      ])
      .where('leaveRequest.id = :id', { id })
      .innerJoin('leaveRequest.user', 'user')
      .leftJoin('leaveRequest.moderator', 'moderator')
      .getOne();
  }

  public findExistingLeaveRequestsByUserAndPeriod(
    user: User,
    startDate: string,
    endDate: string
  ): Promise<LeaveRequest | undefined> {
    return this.repository
      .createQueryBuilder('leaveRequest')
      .select('leaveRequest.id')
      .where('leaveRequest.user = :id', { id: user.getId() })
      .andWhere(
        '(leaveRequest.startDate BETWEEN :startDate AND :endDate OR leaveRequest.endDate BETWEEN :startDate AND :endDate)',
        {
          startDate,
          endDate
        }
      )
      .andWhere(
        '(leaveRequest.status = :accepted OR leaveRequest.status = :pending)',
        {
          accepted: Status.ACCEPTED,
          pending: Status.PENDING
        }
      )
      .getOne();
  }

  public findLeaveRequests(
    page: number,
    status?: Status
  ): Promise<[LeaveRequest[], number]> {
    const query = this.repository
      .createQueryBuilder('leaveRequest')
      .select([
        'leaveRequest.id',
        'leaveRequest.type',
        'leaveRequest.status',
        'leaveRequest.startDate',
        'leaveRequest.startsAllDay',
        'leaveRequest.endDate',
        'leaveRequest.endsAllDay',
        'user.id',
        'user.firstName',
        'user.lastName'
      ])
      .innerJoin('leaveRequest.user', 'user')
      .orderBy('leaveRequest.startDate', 'DESC')
      .limit(MAX_ITEMS_PER_PAGE)
      .offset((page - 1) * MAX_ITEMS_PER_PAGE);

    if (status) {
      query.where('leaveRequest.status = :status', { status });
    }

    return query.getManyAndCount();
  }

  public findAcceptedLeaveRequests(): Promise<LeaveRequest[]> {
    const query = this.repository
      .createQueryBuilder('leaveRequest')
      .select([
        'leaveRequest.id',
        'leaveRequest.startDate',
        'leaveRequest.endDate',
        'user.firstName',
        'user.lastName'
      ])
      .where('status = :status')
      .setParameter('status', Status.ACCEPTED)
      .innerJoin('leaveRequest.user', 'user')
      .innerJoin('user.userAdministrative', 'userAdministrative')
      .andWhere('userAdministrative.leavingDate IS NULL')
      .addOrderBy('leaveRequest.startDate', 'ASC');

    return query.getMany();
  }

  public findAcceptedLeaveRequestsByMonth(date: Date): Promise<LeaveRequest[]> {
    const monthDate: MonthDate = this.dateUtils.getMonth(date);

    const query = this.repository
      .createQueryBuilder('leaveRequest')
      .select([
        'leaveRequest.id',
        'leaveRequest.type',
        'leaveRequest.startDate',
        'leaveRequest.startsAllDay',
        'leaveRequest.endDate',
        'leaveRequest.endsAllDay',
        'user.id'
      ])
      .where('status = :status')
      .setParameter('status', Status.ACCEPTED)
      .andWhere('leaveRequest.startDate <= :lastDayOfMonth')
      .setParameter('lastDayOfMonth', monthDate.getLastDay())
      .andWhere('leaveRequest.endDate >= :firstDayOfMonth')
      .setParameter('firstDayOfMonth', monthDate.getFirstDay())
      .innerJoin('leaveRequest.user', 'user')
      .innerJoin('user.userAdministrative', 'userAdministrative')
      .andWhere('userAdministrative.leavingDate IS NULL')
      .addOrderBy('leaveRequest.startDate', 'ASC');

    return query.getMany();
  }

  public getPendingCount(): Promise<number> {
    const query = this.repository
      .createQueryBuilder('leaveRequest')
      .where('status = :status')
      .setParameter('status', Status.PENDING);

    return query.getCount();
  }
}
