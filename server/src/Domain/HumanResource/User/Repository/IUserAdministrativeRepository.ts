import {UserAdministrative} from '../UserAdministrative.entity';

export interface IUserAdministrativeRepository {
  save(userAdministrative: UserAdministrative): Promise<UserAdministrative>;
}
