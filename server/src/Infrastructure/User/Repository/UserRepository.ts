import {InjectRepository} from '@nestjs/typeorm';
import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';
import {User} from 'src/Domain/User/User.entity';

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
        'user.role',
        'user.entryDate'
      ])
      .where('user.id = :id', {id})
      .getOne();
  }

  public findUsers(): Promise<User[]> {
    return this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.role',
        'user.entryDate'
      ])
      .orderBy('user.lastName', 'ASC')
      .addOrderBy('user.firstName', 'ASC')
      .getMany();
  }

  public save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
