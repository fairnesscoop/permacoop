import {Controller, Inject, UseGuards, Query, Get} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';
import {GetMonthlyActivitiesQuery} from 'src/Application/Activity/Query/GetMonthlyActivitiesQuery';
import {MonthlyActivitiesDTO} from './DTO/MonthlyActivitiesDTO';

@Controller('activities')
@ApiUseTags('Activity')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetMonthlyActivitiesAction {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter
  ) {}

  @Get()
  @ApiOperation({title: 'Get monthly activities by user'})
  public async index(@Query() dto: MonthlyActivitiesDTO) {
    return await this.queryBus.execute(
      new GetMonthlyActivitiesQuery(
        new Date(dto.date),
        dto.userId,
        dto.projectId
      )
    );
  }
}
