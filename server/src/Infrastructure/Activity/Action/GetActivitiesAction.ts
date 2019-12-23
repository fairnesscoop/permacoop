import {Controller, Inject, UseGuards, Query, Get} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';
import {GetMonthlyActivitiesByUserIdQuery} from 'src/Application/Activity/Query/GetMonthlyActivitiesByUserIdQuery';
import {MonthlyActivitiesByUserDTO} from './DTO/MonthlyActivitiesByUserDTO';

@Controller('activities')
@ApiUseTags('Activity')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetActivitiesAction {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter
  ) {}

  @Get()
  @ApiOperation({title: 'Get monthly activities by user'})
  public async index(@Query() dto: MonthlyActivitiesByUserDTO) {
    return await this.queryBus.execute(
      new GetMonthlyActivitiesByUserIdQuery(dto.userId, new Date(dto.date))
    );
  }
}
