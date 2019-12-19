import {Controller, Inject, UseGuards, Query, Get} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';
import {GetActivitiesByUserIdAndMonth} from 'src/Application/Activity/Query/GetActivitiesByUserIdAndMonth';
import {ActivitiesByUserAndMonthDTO} from './DTO/ActivitiesByUserAndMonthDTO';

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
  @ApiOperation({title: 'Get activities by user and month'})
  public async index(@Query() dto: ActivitiesByUserAndMonthDTO) {
    return await this.queryBus.execute(
      new GetActivitiesByUserIdAndMonth(dto.userId, new Date(dto.date))
    );
  }
}
