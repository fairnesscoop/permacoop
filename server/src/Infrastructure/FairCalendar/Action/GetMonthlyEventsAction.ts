import {Controller, Inject, UseGuards, Query, Get} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {IQueryBus} from 'src/Application/IQueryBus';
import {GetMonthlyEventsQuery} from 'src/Application/FairCalendar/Query/GetMonthlyEventsQuery';
import {MonthlyEventsDTO} from './DTO/MonthlyEventsDTO';

@Controller('events')
@ApiUseTags('Event')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetMonthlyActivitiesAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @ApiOperation({title: 'Get monthly events by user'})
  public async index(@Query() dto: MonthlyEventsDTO) {
    return await this.queryBus.execute(
      new GetMonthlyEventsQuery(new Date(dto.date), dto.userId)
    );
  }
}
