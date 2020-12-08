import {User} from '../User.entity';

export interface IUserRepository {
  findOneByApiToken(apiToken: string): Promise<User | undefined>;
  findOneByEmail(email: string): Promise<User | undefined>;
  findOneById(id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
  findUsers(page: number): Promise<[User[], number]>;
  findEmployees(): Promise<User[]>;
}
