import {Controller, Inject, UseGuards, Get} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {ProjectView} from 'src/Application/Project/View/ProjectView';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';
import {GetProjectsQuery} from 'src/Application/Project/Query/Project/GetProjectsQuery';

@Controller('projects')
@ApiUseTags('Project')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetProjectsAction {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter
  ) {}

  @Get()
  @ApiOperation({title: 'Get all projects ordered by customer'})
  public async index(): Promise<ProjectView[]> {
    return await this.queryBus.execute(new GetProjectsQuery());
  }
}
