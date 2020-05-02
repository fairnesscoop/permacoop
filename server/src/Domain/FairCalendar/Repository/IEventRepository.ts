import {Event} from '../Event.entity';
import {User} from 'src/Domain/HumanResource/User/User.entity';

export interface IEventRepository {
  save(activity: Event): Promise<Event>;
  delete(event: Event): void;
  findOneById(id: string): Promise<Event | undefined>;
  findMonthlyEvents(date: string, userId: string): Promise<Event[]>;
  getDayTimeSpentByUser(user: User, date: string): Promise<number>;
}
