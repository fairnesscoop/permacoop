import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { UserAdministrativeView } from './UserAdministrativeView';

export class UserView {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly role: UserRole,
    public readonly isAdministrativeEditable: boolean,
    public readonly administrativeView: UserAdministrativeView = null,
  ) {}
}
