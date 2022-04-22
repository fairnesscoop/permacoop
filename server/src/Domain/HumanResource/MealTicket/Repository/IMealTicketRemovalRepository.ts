import { User } from '../../User/User.entity';
import { MealTicketRemoval } from '../MealTicketRemoval.entity';

export type FindByMonth = {
  id: string;
  count: number;
};

export interface IMealTicketRemovalRepository {
  save(mealTicketRemovals: MealTicketRemoval[]): void;
  findOneByUserAndDate(
    user: User,
    date: Date
  ): Promise<MealTicketRemoval | undefined>;
  findByMonth(date: Date): Promise<FindByMonth[]>;
}
