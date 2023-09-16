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
import { ICommandBus } from 'src/Application/ICommandBus';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/Routing/WithName';
import { AddEventControllerDTO } from '../DTO/AddEventControllerDTO';
import { LoggedUser } from 'src/Infrastructure/HumanResource/User/Decorator/LoggedUser';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetTasksQuery } from 'src/Application/Task/Query/GetTasksQuery';
import { GetProjectsQuery } from 'src/Application/Project/Query/GetProjectsQuery';
import { Pagination } from 'src/Application/Common/Pagination';
import { ProjectView } from 'src/Application/Project/View/ProjectView';
import { TaskView } from 'src/Application/Task/View/TaskView';
import { Response } from 'express';
import { GetCooperativeQuery } from 'src/Application/Settings/Query/GetCooperativeQuery';
import { CooperativeView } from 'src/Application/Settings/View/CooperativeView';
import { ArrayUtils } from 'src/Infrastructure/Common/Utils/ArrayUtils';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { EditEventDTO } from '../DTO/EditEventDTO';
import { UpdateEventCommand } from 'src/Application/FairCalendar/Command/UpdateEventCommand';
import { GetEventByIdQuery } from 'src/Application/FairCalendar/Query/GetEventByIdQuery';

@Controller('app/faircalendar/events/edit')
@UseGuards(IsAuthenticatedGuard)
export class UpdateEventController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @WithName('faircalendar_events_edit')
  @Render('pages/faircalendar_events_edit')
  public async get(@Param() idDto: IdDTO) {
    const event = await this.queryBus.execute(new GetEventByIdQuery(idDto.id));

    const types = [
      'mission',
      'dojo',
      'support',
      'formationConference',
      'other'
    ];

    const tasksPagination: Pagination<TaskView> = await this.queryBus.execute(
      new GetTasksQuery(1)
    );

    const projectsPagination: Pagination<ProjectView> = await this.queryBus.execute(
      new GetProjectsQuery(1)
    );

    const { dayDuration }: CooperativeView = await this.queryBus.execute(
      new GetCooperativeQuery()
    );
    const times = [...ArrayUtils.range(30, dayDuration, 30)].reverse();

    return {
      event,
      types,
      tasks: tasksPagination.items,
      projects: projectsPagination.items,
      times
    };
  }

  @Post(':id')
  public async post(
    @Param() idDto: IdDTO,
    @Body() dto: EditEventDTO,
    @LoggedUser() user: User,
    @Res() res: Response
  ) {
    const { type, time, summary, projectId, taskId } = dto;

    try {
      await this.commandBus.execute(
        new UpdateEventCommand(
          idDto.id,
          user,
          type,
          Number(time),
          projectId,
          taskId,
          summary
        )
      );

      res.redirect(303, '/app/faircalendar');
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
