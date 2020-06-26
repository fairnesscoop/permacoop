import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {UserAdministrative} from 'src/Domain/HumanResource/User/UserAdministrative.entity';

export class UserView {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly role: UserRole
  ) {}
}
