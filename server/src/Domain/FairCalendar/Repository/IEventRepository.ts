import { Event, EventType } from '../Event.entity';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { Project } from 'src/Domain/Project/Project.entity';

export type FindAllEventsByMonth = {
  date: string;
  user: string;
  duration: number;
};

export interface IEventRepository {
  save(event: Event): Promise<Event>;
  delete(event: Event): void;
  findOneById(id: string): Promise<Event | undefined>;
  findMonthlyEvents(date: string, userId: string): Promise<Event[]>;
  sumOfTimeSpentByUserAndDate(user: User, date: string): Promise<number>;
  countEventsByUserAndPeriod(
    user: User,
    startDate: string,
    endDate: string
  ): Promise<number>;
  findAllEventsByMonth(
    date: Date,
    excludedTypes?: EventType[]
  ): Promise<FindAllEventsByMonth[]>;
}
