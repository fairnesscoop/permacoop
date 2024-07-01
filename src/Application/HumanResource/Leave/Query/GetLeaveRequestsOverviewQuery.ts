import { IQuery } from 'src/Application/IQuery';
import { User } from 'src/Domain/HumanResource/User/User.entity';

export class GetLeaveRequestsOverviewQuery implements IQuery {
  constructor(public readonly date: Date, public readonly user: User) {}
}
