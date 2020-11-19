import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILeaveRequestRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRequestRepository';
import { MAX_ITEMS_PER_PAGE } from 'src/Application/Common/Pagination';
import { LeaveRequest, Status } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { User } from 'src/Domain/HumanResource/User/User.entity';

export class LeaveRequestRepository implements ILeaveRequestRepository {
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly repository: Repository<LeaveRequest>
  ) {}

  public save(leaveRequest: LeaveRequest): Promise<LeaveRequest> {
    return this.repository.save(leaveRequest);
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
        'leaveRequest.moderationComment',
        'user.id',
        'user.firstName',
        'user.lastName',
        'moderator.id',
        'moderator.firstName',
        'moderator.lastName',
      ])
      .where('leaveRequest.id = :id', {id})
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
      .where('leaveRequest.user = :id', {id: user.getId()})
      .andWhere(
        '(leaveRequest.startDate BETWEEN :startDate AND :endDate OR leaveRequest.endDate BETWEEN :startDate AND :endDate)',
        {
          startDate,
          endDate
        }
      )
      .andWhere('(leaveRequest.status = :accepted OR leaveRequest.status = :pending)', {
        accepted: Status.ACCEPTED,
        pending: Status.PENDING
      })
      .getOne();
  }

  public findLeaveRequests(page: number): Promise<[LeaveRequest[], number]> {
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
        'user.id',
        'user.firstName',
        'user.lastName'
      ])
      .innerJoin('leaveRequest.user', 'user')
      .orderBy('leaveRequest.startDate', 'DESC')
      .limit(MAX_ITEMS_PER_PAGE)
      .offset((page - 1) * MAX_ITEMS_PER_PAGE)
      .getManyAndCount();
  }
}
