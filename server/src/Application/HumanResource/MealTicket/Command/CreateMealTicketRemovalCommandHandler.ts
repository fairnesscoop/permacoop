import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IMealTicketRemovalRepository } from 'src/Domain/HumanResource/MealTicket/Repository/IMealTicketRemovalRepository';
import { MealTicketRemoval } from 'src/Domain/HumanResource/MealTicket/MealTicketRemoval.entity';
import { MealTicketRemovalAlreadyExistException } from 'src/Domain/HumanResource/MealTicket/Exception/MealTicketRemovalAlreadyExistException';
import { IsMealTicketRemovalAlreadyExist } from 'src/Domain/HumanResource/MealTicket/Specification/IsMealTicketRemovalAlreadyExist';
import { CreateMealTicketRemovalCommand } from './CreateMealTicketRemovalCommand';
import { IDateUtils } from 'src/Application/IDateUtils';
import { NotAWorkingDateException } from 'src/Domain/HumanResource/MealTicket/Exception/NotAWorkingDateException';

@CommandHandler(CreateMealTicketRemovalCommand)
export class CreateMealTicketRemovalCommandHandler {
  constructor(
    @Inject('IMealTicketRemovalRepository')
    private readonly mealTicketRemovalRepository: IMealTicketRemovalRepository,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private readonly isMealTicketRemovalAlreadyExist: IsMealTicketRemovalAlreadyExist,
  ) {}

  public async execute(
    command: CreateMealTicketRemovalCommand
  ): Promise<void> {
    const { date, comment, user } = command;

    if (false === this.dateUtils.isAWorkingDay(new Date(date))) {
      throw new NotAWorkingDateException();
    }

    if (
      true ===
      (await this.isMealTicketRemovalAlreadyExist.isSatisfiedBy(
        user,
        new Date(date)
      ))
    ) {
      throw new MealTicketRemovalAlreadyExistException();
    }

    await this.mealTicketRemovalRepository.save([new MealTicketRemoval(date, user, comment)]);
  }
}
