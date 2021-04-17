import {
  Controller,
  Inject,
  UseGuards,
  Query,
  Get,
  BadRequestException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetMonthlyFairCalendarQuery } from 'src/Application/FairCalendar/Query/GetMonthlyFairCalendarQuery';
import { MonthlyEventsDTO } from '../DTO/MonthlyEventsDTO';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { GetFairCalendarOverview } from 'src/Domain/FairCalendar/GetFairCalendarOverview';
import { MonthlyEventsView } from 'src/Application/FairCalendar/View/MonthlyEventsView';

@Controller('faircalendar')
@ApiTags('FairCalendar')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetMonthlyFairCalendarAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly getFairCalendarOverview: GetFairCalendarOverview
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get monthly faircalendar by user' })
  public async index(@Query() dto: MonthlyEventsDTO) {
    try {
      const views = await this.queryBus.execute(
        new GetMonthlyFairCalendarQuery(new Date(dto.date), dto.userId)
      );

      return new MonthlyEventsView(
        views,
        await this.getFairCalendarOverview.index(views)
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
