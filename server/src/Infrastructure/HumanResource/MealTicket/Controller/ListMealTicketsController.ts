import {
  Controller,
  Inject,
  UseGuards,
  Get,
  Render,
  BadRequestException
} from '@nestjs/common';
import { IQueryBus } from 'src/Application/IQueryBus';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { GetMealTicketsPerMonthQuery } from 'src/Application/HumanResource/MealTicket/Query/GetMealTicketsPerMonthQuery';
import { MealTicketsPerMonthView } from 'src/Application/HumanResource/MealTicket/Views/MealTicketsPerMonthView';
import { MealTicketTableFactory } from '../Table/MealTicketTableFactory';

@Controller('app/people/meal_tickets')
@UseGuards(IsAuthenticatedGuard)
export class ListMealTicketsController {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly tableFactory: MealTicketTableFactory
  ) {}

  @Get()
  @WithName('people_meal_tickets_list')
  @Render('pages/meal_tickets/list.njk')
  public async get() {
    try {
      const mealTickets: MealTicketsPerMonthView[] = await this.queryBus.execute(
        new GetMealTicketsPerMonthQuery(new Date())
      );

      const table = this.tableFactory.create(mealTickets);

      return { table };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
