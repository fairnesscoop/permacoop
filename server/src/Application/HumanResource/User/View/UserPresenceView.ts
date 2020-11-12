import { TaskView } from 'src/Application/Task/View/TaskView';
import { UserSummaryView } from './UserSummaryView';

export class UserPresenceView {
  constructor(
    public readonly user: UserSummaryView,
    public readonly isPresent: boolean,
    public readonly task?: TaskView
  ) {}
}
