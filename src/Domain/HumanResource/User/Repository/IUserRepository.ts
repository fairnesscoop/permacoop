import { User } from '../User.entity';

export interface IUserRepository {
  findOneByApiToken(apiToken: string): Promise<User | undefined>;
  findOneByEmail(email: string): Promise<User | undefined>;
  findOneById(id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
  findUsers(
    withAccountant: boolean,
    noLeavingDate: boolean,
    withLeavingDate: boolean
  ): Promise<User[]>;
  findUsersWithPayslipInfo(): Promise<User[]>;
}
