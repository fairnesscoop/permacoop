import {InjectRepository} from '@nestjs/typeorm';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';
import {User} from 'src/Domain/User/User.entity';
import {Repository} from 'typeorm';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  public findOneByApiToken = (apiToken: string): Promise<User | undefined> => {
    return this.repository
      .createQueryBuilder('user')
      .select(['user.id', 'user.firstName', 'user.lastName', 'user.email'])
      .where('user.apiToken = :apiToken', {apiToken})
      .getOne();
  };

  public save = (user: User): Promise<User> => {
    return this.repository.save(user);
  };
}
