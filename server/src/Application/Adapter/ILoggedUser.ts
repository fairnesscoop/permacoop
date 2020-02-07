import {User} from '../../Domain/User/User.entity';

export interface ILoggedUser {
  get(): Promise<User | null>;
}
