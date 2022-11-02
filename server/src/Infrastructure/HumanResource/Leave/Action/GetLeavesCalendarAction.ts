import {
  Controller,
  Inject,
  BadRequestException,
  Get,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GetLeavesCalendarQuery } from 'src/Application/HumanResource/Leave/Query/GetLeavesCalendarQuery';
import { IQueryBus } from 'src/Application/IQueryBus';

@Controller('leaves')
@ApiTags('Human Resource')
export class GetLeavesCalendarAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get('calendar.ics')
  @ApiOperation({ summary: 'Export leaves to iCalendar format' })
  public async index(@Res() res: Response): Promise<Response> {
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
