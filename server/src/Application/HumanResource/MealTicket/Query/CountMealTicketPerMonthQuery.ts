import { IQuery } from 'src/Application/IQuery';
import { User } from 'src/Domain/HumanResource/User/User.entity';

export class CountMealTicketPerMonthQuery implements IQuery {
  constructor(public readonly user: User, public readonly currentDate: Date) {}
}
