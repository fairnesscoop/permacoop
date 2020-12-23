import { Inject } from '@nestjs/common';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { IMealTicketRemovalRepository } from '../Repository/IMealTicketRemovalRepository';
import { MealTicketRemoval } from '../MealTicketRemoval.entity';

export class IsMealTicketRemovalAlreadyExist {
  constructor(
    @Inject('IMealTicketRemovalRepository')
    private readonly mealTicketRemovalRepository: IMealTicketRemovalRepository
  ) {}

  public async isSatisfiedBy(user: User, date: Date): Promise<boolean> {
    return (
      (await this.mealTicketRemovalRepository.findOneByUserAndDate(user, date)) instanceof
      MealTicketRemoval
    );
  }
}
