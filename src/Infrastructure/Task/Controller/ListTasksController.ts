import {
  Controller,
  Inject,
  UseGuards,
  Get,
  Query,
  Render
} from '@nestjs/common';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetTasksQuery } from 'src/Application/Task/Query/GetTasksQuery';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { Pagination } from 'src/Application/Common/Pagination';
import { TaskView } from 'src/Application/Task/View/TaskView';
import { TaskTableFactory } from '../Table/TaskTableFactory';

@Controller('app/tasks')
@UseGuards(IsAuthenticatedGuard)
export class ListTasksController {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly tableFactory: TaskTableFactory
  ) {}

  @Get()
  @WithName('crm_tasks_list')
  @Render('pages/tasks/list.njk')
  public async get(@Query() paginationDto: PaginationDTO) {
    const pagination: Pagination<TaskView> = await this.queryBus.execute(
      new GetTasksQuery(paginationDto.page)
    );

    const table = this.tableFactory.create(pagination.items);

    return { table, pagination, currentPage: paginationDto.page };
  }
}
