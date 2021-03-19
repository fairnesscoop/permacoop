import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IMealTicketRemovalRepository } from 'src/Domain/HumanResource/MealTicket/Repository/IMealTicketRemovalRepository';
import { MealTicketRemoval } from 'src/Domain/HumanResource/MealTicket/MealTicketRemoval.entity';
import { MealTicketRemovalAlreadyExistException } from 'src/Domain/HumanResource/MealTicket/Exception/MealTicketRemovalAlreadyExistException';
import { IsMealTicketRemovalAlreadyExist } from 'src/Domain/HumanResource/MealTicket/Specification/IsMealTicketRemovalAlreadyExist';
import { GetMealTickerCountPerMonthQuery } from './GetMealTickerCountPerMonthQuery';


@QueryHandler(GetMealTickerCountPerMonthQuery)
export class GetMealTickerCountPerMonthQueryHandler {
  constructor(

  ) { }

  public async execute(command: GetMealTickerCountPerMonthQuery): Promise<{ [month: string]: number }[]> {
    const { user } = command;

    return Promise.resolve([
      {
        '1': 666
      }
    ]);
  }
}
