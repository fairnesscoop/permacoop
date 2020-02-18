import {Controller, Inject, UseGuards, Get} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {TaskView} from 'src/Application/Task/View/TaskView';
import {GetTasksQuery} from 'src/Application/Task/Query/GetTasksQuery';
import {IQueryBus} from 'src/Application/IQueryBus';

@Controller('tasks')
@ApiUseTags('Task')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetTasksAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @ApiOperation({title: 'Get all tasks'})
  public async index(): Promise<TaskView[]> {
    return await this.queryBus.execute(new GetTasksQuery());
  }
}
