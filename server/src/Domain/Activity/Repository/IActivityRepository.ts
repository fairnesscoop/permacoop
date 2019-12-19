import {Activity} from '../Activity.entity';
import {User} from 'src/Domain/User/User.entity';

export interface IActivityRepository {
  save(activity: Activity): Promise<Activity>;
  findOneById(id: string): Promise<Activity | undefined>;
  getTimeSpentSumByUserAndDate(user: User, date: Date);
}
