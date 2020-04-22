import {UserView} from 'src/Application/User/View/UserView';
import {TaskView} from 'src/Application/Task/View/TaskView';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';

export class DailyRateView {
  constructor(
    public readonly id: string,
    public readonly amount: number,
    public readonly user: UserView,
    public readonly task: TaskView,
    public readonly customer: CustomerView
  ) {}
}
