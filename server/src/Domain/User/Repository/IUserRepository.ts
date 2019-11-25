import {User} from '../User.entity';

export interface IUserRepository {
  findOneByApiToken(apiToken: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
