import { User } from '../../User/User.entity';
import { MealTicketRemoval } from '../MealTicketRemoval.entity';

export interface IMealTicketRemovalRepository {
  save(MealTicketRemoval: MealTicketRemoval): Promise<MealTicketRemoval>;
  findOneByUserAndDate(user: User, date: Date): Promise<MealTicketRemoval | undefined>;
}
