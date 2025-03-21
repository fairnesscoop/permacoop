import {
  Controller,
  Inject,
  BadRequestException,
  Get,
  Res,
  UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import { IQueryBus } from 'src/Application/IQueryBus';
import { CalendarTokenGuard } from 'src/Infrastructure/HumanResource/User/Security/CalendarTokenGuard';
import { GetLeavesCalendarQuery } from 'src/Application/HumanResource/Leave/Query/GetLeavesCalendarQuery';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HR :: Leave')
@Controller('api/leaves/calendar.ics')
@UseGuards(CalendarTokenGuard)
export class ExportLeavesCalendarController {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @WithName('people_leaves_calendar')
  public async get(@Res() res: Response): Promise<Response> {
    res.header('Content-Type', 'text/calendar;charset=UTF-8');
    res.header('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.attachment('leaves.ics');

    let ics: string;

    try {
      ics = await this.queryBus.execute(new GetLeavesCalendarQuery());
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return res.send(ics);
  }
}
