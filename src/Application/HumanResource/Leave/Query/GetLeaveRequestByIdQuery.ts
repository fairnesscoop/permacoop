import { IQuery } from 'src/Application/IQuery';
import { User } from 'src/Domain/HumanResource/User/User.entity';

export class GetLeaveRequestByIdQuery implements IQuery {
  constructor(public readonly id: string, public readonly currentUser: User) {}
}
