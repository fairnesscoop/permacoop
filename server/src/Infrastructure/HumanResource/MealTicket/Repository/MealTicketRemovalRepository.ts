import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MealTicketRemoval } from 'src/Domain/HumanResource/MealTicket/MealTicketRemoval.entity';
import { FindByMonth, IMealTicketRemovalRepository } from 'src/Domain/HumanResource/MealTicket/Repository/IMealTicketRemovalRepository';
import { User } from 'src/Domain/HumanResource/User/User.entity';

export class MealTicketRemovalRepository implements IMealTicketRemovalRepository {
  constructor(
    @InjectRepository(MealTicketRemoval)
    private readonly repository: Repository<MealTicketRemoval>
  ) {}

  public save(mealTicketRemovals: MealTicketRemoval[]): void {
    this.repository.save(mealTicketRemovals);
  }

  public findOneByUserAndDate(
    user: User,
    date: Date
  ): Promise<MealTicketRemoval | undefined> {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();

    return this.repository
      .createQueryBuilder('m')
      .select(['m.id'])
      .where('m.user = :userId', { userId: user.getId() })
      .andWhere('extract(month FROM m.date) = :month', {
        month
      })
      .andWhere('extract(year FROM m.date) = :year', { year })
      .andWhere('extract(day FROM m.date) = :day', { day })
      .getOne();
  }

  public findByMonth(date: Date): Promise<FindByMonth[]> {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return this.repository
      .createQueryBuilder('mealTicketRemoval')
      .select(['user.id, COUNT(mealTicketRemoval.id)::int as count'])
      .where('extract(month FROM mealTicketRemoval.date) = :month', { month })
      .andWhere('extract(year FROM mealTicketRemoval.date) = :year', { year })
      .innerJoin('mealTicketRemoval.user', 'user')
      .groupBy('user.id')
      .getRawMany();
  }
}
