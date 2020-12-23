import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MealTicketRemoval } from 'src/Domain/HumanResource/MealTicket/MealTicketRemoval.entity';
import { IMealTicketRemovalRepository } from 'src/Domain/HumanResource/MealTicket/Repository/IMealTicketRemovalRepository';
import { User } from 'src/Domain/HumanResource/User/User.entity';

export class MealTicketRemovalRepository implements IMealTicketRemovalRepository {
  constructor(
    @InjectRepository(MealTicketRemoval)
    private readonly repository: Repository<MealTicketRemoval>
  ) {}

  public save(mealTicketRemoval: MealTicketRemoval): Promise<MealTicketRemoval> {
    return this.repository.save(mealTicketRemoval);
  }

  public findOneByUserAndDate(
    user: User,
    date: Date
  ): Promise<MealTicketRemoval | undefined> {
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    const day = new Date(date).getDay();

    return this.repository
      .createQueryBuilder('mealTicketRemoval')
      .select(['mealTicketRemoval.id'])
      .where('mealTicketRemoval.user = :userId', { userId: user.getId() })
      .andWhere('extract(month FROM mealTicketRemoval.date) = :month', { month })
      .andWhere('extract(year FROM mealTicketRemoval.date) = :year', { year })
      .andWhere('extract(day FROM mealTicketRemoval.date) = :day', { day })
      .getOne();
  }
}
