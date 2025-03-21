import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Render,
  Res,
  UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import { ICommandBus } from 'src/Application/ICommandBus';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { CreateTaskCommand } from 'src/Application/Task/Command/CreateTaskCommand';
import { TaskDTO } from '../DTO/TaskDTO';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@Controller('app/tasks/add')
@UseGuards(IsAuthenticatedGuard)
export class AddTaskController {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus,
    private readonly resolver: RouteNameResolver
  ) {}

  @Get()
  @WithName('crm_tasks_add')
  @Render('pages/tasks/add.njk')
  public async get() {
    return {};
  }

  @Post()
  public async post(@Body() taskDto: TaskDTO, @Res() res: Response) {
    const { name } = taskDto;

    try {
      await this.commandBus.execute(new CreateTaskCommand(name));

      res.redirect(303, this.resolver.resolve('crm_tasks_list'));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
