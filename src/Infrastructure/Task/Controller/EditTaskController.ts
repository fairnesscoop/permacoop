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
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { IQueryBus } from 'src/Application/IQueryBus';
import { Response } from 'express';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { TaskDTO } from '../DTO/TaskDTO';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { GetTaskByIdQuery } from 'src/Application/Task/Query/GetTaskByIdQuery';
import { UpdateTaskCommand } from 'src/Application/Task/Command/UpdateTaskCommand';

@Controller('app/tasks/edit')
@UseGuards(IsAuthenticatedGuard)
export class EditTaskController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly resolver: RouteNameResolver
  ) {}

  @Get(':id')
  @WithName('crm_tasks_edit')
  @Render('pages/tasks/edit.njk')
  public async get(@Param() idDto: IdDTO) {
    const task = await this.queryBus.execute(new GetTaskByIdQuery(idDto.id));

    return {
      task
    };
  }

  @Post(':id')
  public async post(
    @Param() idDto: IdDTO,
    @Body() dto: TaskDTO,
    @Res() res: Response
  ) {
    const { name } = dto;

    try {
      await this.commandBus.execute(new UpdateTaskCommand(idDto.id, name));

      res.redirect(303, this.resolver.resolve('crm_tasks_list'));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
