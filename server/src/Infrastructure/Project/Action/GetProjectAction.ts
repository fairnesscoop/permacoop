import {
  Controller,
  Inject,
  UseGuards,
  Get,
  Param,
  NotFoundException
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {ProjectView} from 'src/Application/Project/View/ProjectView';
import {GetProjectByIdQuery} from 'src/Application/Project/Query/GetProjectByIdQuery';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';

@Controller('projects')
@ApiUseTags('Project')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetProjectAction {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter
  ) {}

  @Get(':id')
  @ApiOperation({title: 'Get project'})
  public async index(
    @Param() query: GetProjectByIdQuery
  ): Promise<ProjectView> {
    try {
      return await this.queryBus.execute(query);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
