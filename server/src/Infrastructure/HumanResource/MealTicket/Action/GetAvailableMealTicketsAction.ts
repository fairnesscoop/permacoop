import {
  Get,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { IQueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { GetMealTicketsPerMonthQuery } from 'src/Application/HumanResource/MealTicket/Query/GetMealTicketsPerMonthQuery';

@Controller('meal-tickets')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetAvailableMealTicketsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get all available meal tickets' })
  public async index() {
    try {
      return await this.queryBus.execute(
        new GetMealTicketsPerMonthQuery(new Date())
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
