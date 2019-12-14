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
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiImplicitParam
} from '@nestjs/swagger';
import {ProjectView} from 'src/Application/Project/View/ProjectView';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {UpdateProjectCommand} from 'src/Application/Project/Command/UpdateProjectCommand';

@Controller('projects')
@ApiUseTags('Project')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class UpdateProjectAction {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter
  ) {}

  @Put(':id')
  @ApiImplicitParam({name: 'id'})
  @ApiOperation({title: 'Update project'})
  public async index(
    @Param('id') id,
    @Body() command: UpdateProjectCommand
  ): Promise<ProjectView> {
    try {
      command.id = id;

      return await this.commandBus.execute(command);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
