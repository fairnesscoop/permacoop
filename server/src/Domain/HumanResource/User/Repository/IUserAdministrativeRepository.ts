import { UserAdministrative } from '../UserAdministrative.entity';

export interface IUserAdministrativeRepository {
  findOneByUserId(userId: string): Promise<UserAdministrative | undefined>;
  save(userAdministrative: UserAdministrative): Promise<UserAdministrative>;
}
