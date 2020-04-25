import {UserRole} from 'src/Domain/User/User.entity';

export class AuthenticatedView {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly role: UserRole,
    public readonly apiToken: string
  ) {}
}
