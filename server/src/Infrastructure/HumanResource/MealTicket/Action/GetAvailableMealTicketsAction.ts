import {
  Get,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User, UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { LoggedUser } from '../../User/Decorator/LoggedUser';
import { IQueryBus } from '@nestjs/cqrs';
import { GetMealTicketCountPerMonthQuery } from 'src/Application/HumanResource/MealTicket/Query/GetMealTicketCountPerMonthQuery';

@Controller('meal-tickets')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetAvailableMealTicketsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) { }

  @Get('count')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get all available Meal Tickets' })
  public async index(@LoggedUser() user: User) {
    try {
      const result = await this.queryBus.execute(
        new GetMealTicketCountPerMonthQuery(user, new Date())
      );
      return result;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
