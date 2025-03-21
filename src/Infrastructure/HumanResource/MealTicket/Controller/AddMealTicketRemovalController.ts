import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Get,
  Render,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { ICommandBus } from 'src/Application/ICommandBus';
import { MealTicketRemovalDTO } from '../DTO/MealTicketRemovalDTO';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LoggedUser } from '../../User/Decorator/LoggedUser';
import { CreateMealTicketRemovalCommand } from 'src/Application/HumanResource/MealTicket/Command/CreateMealTicketRemovalCommand';
import { IsAuthenticatedGuard } from '../../User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HR :: Meal Ticket')
@Controller('app/people/meal-tickets/removal/add')
@UseGuards(IsAuthenticatedGuard)
export class AddMealTicketRemovalController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    private readonly resolver: RouteNameResolver
  ) {}

  @Get()
  @WithName('people_meal_tickets_removal_add')
  @Render('pages/meal_tickets/add.njk')
  public async get() {
    return {};
  }

  @Post()
  public async post(
    @Body() { date }: MealTicketRemovalDTO,
    @LoggedUser() user: User,
    @Res() res: Response
  ) {
    try {
      await this.commandBus.execute(
        new CreateMealTicketRemovalCommand(date, user)
      );

      res.redirect(303, this.resolver.resolve('people_meal_tickets_list'));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
