import {Controller, Inject, UseGuards, Query, Get} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {IQueryBus} from 'src/Application/IQueryBus';
import {GetMonthlyFairCalendarQuery} from 'src/Application/FairCalendar/Query/GetMonthlyFairCalendarQuery';
import {MonthlyEventsDTO} from '../DTO/MonthlyEventsDTO';
import {Roles} from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {RolesGuard} from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';

@Controller('faircalendar')
@ApiTags('FairCalendar')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetMonthlyFairCalendarAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({summary: 'Get monthly faircalendar by user'})
  public async index(@Query() dto: MonthlyEventsDTO) {
    return await this.queryBus.execute(
      new GetMonthlyFairCalendarQuery(new Date(dto.date), dto.userId)
    );
  }
}
