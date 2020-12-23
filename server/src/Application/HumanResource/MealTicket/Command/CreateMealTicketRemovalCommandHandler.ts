import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IMealTicketRemovalRepository } from 'src/Domain/HumanResource/MealTicket/Repository/IMealTicketRemovalRepository';
import { MealTicketRemoval } from 'src/Domain/HumanResource/MealTicket/MealTicketRemoval.entity';
import { MealTicketRemovalAlreadyExistException } from 'src/Domain/HumanResource/MealTicket/Exception/MealTicketRemovalAlreadyExistException';
import { IsMealTicketRemovalAlreadyExist } from 'src/Domain/HumanResource/MealTicket/Specification/IsMealTicketRemovalAlreadyExist';
import { CreateMealTicketRemovalCommand } from './CreateMealTicketRemovalCommand';

@CommandHandler(CreateMealTicketRemovalCommand)
export class CreateMealTicketRemovalCommandHandler {
  constructor(
    @Inject('IMealTicketRemovalRepository')
    private readonly mealTicketRemovalRepository: IMealTicketRemovalRepository,
    private readonly isMealTicketRemovalAlreadyExist: IsMealTicketRemovalAlreadyExist,
  ) {}

  public async execute(command: CreateMealTicketRemovalCommand): Promise<string> {
    const { date, comment, user } = command;

    if (
      true ===
      (await this.isMealTicketRemovalAlreadyExist.isSatisfiedBy(user, new Date(date)))
    ) {
      throw new MealTicketRemovalAlreadyExistException();
    }

    const mealTicketRemoval = await this.mealTicketRemovalRepository.save(
      new MealTicketRemoval(date, comment, user)
    );

    return mealTicketRemoval.getId();
  }
}
