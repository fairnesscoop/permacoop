import {
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Param,
  Get
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {IQueryBus} from 'src/Application/IQueryBus';
import {EventIdDTO} from './DTO/EventIdDTO';
import {GetEventByIdQuery} from 'src/Application/FairCalendar/Query/GetEventByIdQuery';
import {EventView} from 'src/Application/FairCalendar/View/EventView';

@Controller('events')
@ApiUseTags('Event')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetEventAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @ApiOperation({title: 'Get event'})
  public async index(@Param() dto: EventIdDTO): Promise<EventView> {
    try {
      return await this.queryBus.execute(new GetEventByIdQuery(dto.id));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
