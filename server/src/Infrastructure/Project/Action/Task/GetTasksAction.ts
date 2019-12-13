import {Controller, Inject, UseGuards, Get} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {TaskView} from 'src/Application/Project/View/TaskView';
import {GetTasksQuery} from 'src/Application/Project/Query/Task/GetTasksQuery';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';

@Controller('tasks')
@ApiUseTags('Task')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetTasksAction {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter
  ) {}

  @Get()
  @ApiOperation({title: 'Get all tasks'})
  public async index(): Promise<TaskView[]> {
    return await this.queryBus.execute(new GetTasksQuery());
  }
}
