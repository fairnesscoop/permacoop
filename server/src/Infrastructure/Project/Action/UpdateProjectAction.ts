import {
  Body,
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Put,
  Param
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {ProjectView} from 'src/Application/Project/View/ProjectView';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {UpdateProjectCommand} from 'src/Application/Project/Command/UpdateProjectCommand';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';
import {GetProjectByIdQuery} from 'src/Application/Project/Query/GetProjectByIdQuery';
import {ProjectDTO} from './DTO/ProjectDTO';
import {ProjectIdDTO} from './DTO/ProjectIdDTO';

@Controller('projects')
@ApiUseTags('Project')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class UpdateProjectAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter
  ) {}

  @Put(':id')
  @ApiOperation({title: 'Update project'})
  public async index(
    @Param() projectIdDto: ProjectIdDTO,
    @Body() projectDto: ProjectDTO
  ): Promise<ProjectView> {
    try {
      await this.commandBus.execute(
        new UpdateProjectCommand(
          projectIdDto.id,
          projectDto.name,
          projectDto.customerId
        )
      );

      return await this.queryBus.execute(
        new GetProjectByIdQuery(projectIdDto.id)
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
