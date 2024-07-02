import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Render,
  Res,
  UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import { ICommandBus } from 'src/Application/ICommandBus';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { AddEventControllerDTO } from '../DTO/AddEventControllerDTO';
import { AddEventDTO } from '../DTO/AddEventDTO';
import { AddEventCommand } from 'src/Application/FairCalendar/Command/AddEventCommand';
import { LoggedUser } from 'src/Infrastructure/HumanResource/User/Decorator/LoggedUser';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetTasksQuery } from 'src/Application/Task/Query/GetTasksQuery';
import { GetProjectsQuery } from 'src/Application/Project/Query/GetProjectsQuery';
import { GetCooperativeQuery } from 'src/Application/Settings/Query/GetCooperativeQuery';
import { ArrayUtils } from 'src/Infrastructure/Common/Utils/ArrayUtils';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { makeMonthUrl } from '../Routing/urls';

@Controller('app/faircalendar/events/add')
@UseGuards(IsAuthenticatedGuard)
export class AddEventController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly resolver: RouteNameResolver
  ) {}

  @Get(':startDate--:endDate')
  @WithName('faircalendar_events_add')
  @Render('pages/faircalendar/events/add.njk')
  public async get(@Param() dto: AddEventControllerDTO) {
    const types = [
      'mission',
      'dojo',
      'support',
      'formationConference',
      'other'
    ];

    const tasksPagination = await this.queryBus.execute(new GetTasksQuery(1));

    const projectsPagination = await this.queryBus.execute(
      new GetProjectsQuery(null, true)
    );

    const { dayDuration } = await this.queryBus.execute(
      new GetCooperativeQuery()
    );
    const times = [...ArrayUtils.range(30, dayDuration, 30)].reverse();

    return {
      startDate: dto.startDate,
      endDate: dto.endDate,
      types,
      tasks: tasksPagination.items,
      projects: projectsPagination.items,
      times
    };
  }

  @Post(':date')
  public async post(
    @Body() dto: AddEventDTO,
    @LoggedUser() user: User,
    @Res() res: Response
  ) {
    try {
      const {
        type,
        startDate,
        endDate,
        projectId,
        taskId,
        summary,
        time
      } = dto;
      await this.commandBus.execute(
        new AddEventCommand(
          type,
          user,
          time,
          new Date(startDate),
          new Date(endDate),
          projectId,
          taskId,
          summary
        )
      );

      res.redirect(303, makeMonthUrl(this.resolver, new Date(startDate)));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
