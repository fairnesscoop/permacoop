import {Activity} from '../Activity.entity';
import {User} from 'src/Domain/User/User.entity';

export interface IActivityRepository {
  save(activity: Activity): Promise<Activity>;
  findOneById(id: string): Promise<Activity | undefined>;
  findMonthlyActivities(
    date: string,
    userId: string,
    projectId: string
  ): Promise<Activity[]>;
  getTimeSpentSumByUserAndDate(user: User, date: string): Promise<number>;
  deleteById(id: string): void;
}
