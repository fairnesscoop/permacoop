import {UserSummaryView} from 'src/Application/User/View/UserSummaryView';
import {TaskView} from 'src/Application/Task/View/TaskView';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';

export class DailyRateView {
  constructor(
    public readonly id: string,
    public readonly amount: number,
    public readonly user: UserSummaryView,
    public readonly task: TaskView,
    public readonly customer: CustomerView
  ) {}
}
