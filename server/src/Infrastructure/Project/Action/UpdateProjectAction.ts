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
import {ICommandBus} from 'src/Application/ICommandBus';
import {UpdateProjectCommand} from 'src/Application/Project/Command/UpdateProjectCommand';
import {ProjectDTO} from './DTO/ProjectDTO';
import {ProjectIdDTO} from './DTO/ProjectIdDTO';

@Controller('projects')
@ApiUseTags('Project')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class UpdateProjectAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id')
  @ApiOperation({title: 'Update project'})
  public async index(
    @Param() projectIdDto: ProjectIdDTO,
    @Body() projectDto: ProjectDTO
  ) {
    try {
      const {id} = projectIdDto;
      const {name, customerId} = projectDto;

      await this.commandBus.execute(
        new UpdateProjectCommand(id, name, customerId)
      );

      return {id};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
