import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import { User, UserRole } from 'src/Domain/HumanResource/User/User.entity';

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
      .where('user.apiToken = :apiToken', { apiToken })
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
      .where('user.email = :email', { email })
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
      .where('user.id = :id', { id })
      .getOne();
  }

  public findUsers(
    withAccountant: boolean,
    noLeavingDate = false
  ): Promise<User[]> {
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
      query.andWhere('user.role <> :role', { role: UserRole.ACCOUNTANT });
    }
    if (noLeavingDate) {
      query.innerJoin('user.userAdministrative', 'userAdministrative');
      query.andWhere('userAdministrative.leavingDate IS NULL');
    }

    return query.getMany();
  }

  public findUsersWithPayslipInfo(): Promise<User[]> {
    const query = this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'userAdministrative.joiningDate',
        'userAdministrative.leavingDate',
        'userAdministrative.annualEarnings',
        'userAdministrative.transportFee',
        'userAdministrative.healthInsurance',
        'userAdministrative.executivePosition',
        'userAdministrative.contract',
        'userAdministrative.workingTime',
        'userAdministrative.sustainableMobilityFee'
      ]);
    query.innerJoin('user.userAdministrative', 'userAdministrative');
    query.andWhere('user.role <> :role', { role: UserRole.ACCOUNTANT });
    query.andWhere('userAdministrative.leavingDate IS NULL');
    query.orderBy('user.lastName', 'ASC');
    query.addOrderBy('user.firstName', 'ASC');

    return query.getMany();
  }

  public save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
