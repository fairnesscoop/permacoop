import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import { User, UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { Leave } from 'src/Domain/HumanResource/Leave/Leave.entity';
import { Event } from 'src/Domain/FairCalendar/Event.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  public findOneByApiToken(apiToken: string): Promise<User | undefined> {
    return this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.role'
      ])
      .where('user.apiToken = :apiToken', {apiToken})
      .getOne();
  }

  public findOneByEmail(email: string): Promise<User | undefined> {
    return this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.apiToken',
        'user.password',
        'user.role'
      ])
      .where('user.email = :email', {email})
      .getOne();
  }

  public findOneById(id: string): Promise<User | undefined> {
    return this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.role'
      ])
      .where('user.id = :id', {id})
      .getOne();
  }

  public findUsers(withAccountant: boolean): Promise<User[]> {
    const query = this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.role'
      ])
      .orderBy('user.lastName', 'ASC')
      .addOrderBy('user.firstName', 'ASC');

    if (false === withAccountant) {
      query.where('user.role <> :role', {role: UserRole.ACCOUNTANT});
    }

    return query.getMany();
  }

  public findUsersPresences(date: Date): Promise<any[]> {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
      ])
      .where('user.role <> :role', {role: UserRole.ACCOUNTANT})
      .addSelect(leaveQuery => {
        return leaveQuery
          .select('leave.id')
          .from(Leave, 'leave')
          .innerJoin('leave.leaveRequest', 'leaveRequest')
          .innerJoin('leaveRequest.user', 'leaveUser')
          .where('leaveUser.id = user.id')
          .andWhere('extract(day FROM leave.date) = :day', { day })
          .andWhere('extract(month FROM leave.date) = :month', { month })
          .andWhere('extract(year FROM leave.date) = :year', { year })
      }, 'leave')
      .addSelect(eventQuery => {
        return eventQuery
          .select('STRING_AGG(event.date, \',\')')
          .from(Event, 'event')
          .innerJoin('event.user', 'eventUser')
          .where('eventUser.id = user.id')
          // .leftJoin('event.project', 'project')
          .andWhere('extract(day FROM event.date) = :day', { day })
          .andWhere('extract(month FROM event.date) = :month', { month })
          .andWhere('extract(year FROM event.date) = :year', { year })
      }, 'events')
      .orderBy('user.lastName', 'ASC')
      .addOrderBy('user.firstName', 'ASC')
      .getRawMany();
  }

  public save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
