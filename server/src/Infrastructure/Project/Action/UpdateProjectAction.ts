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
import {IdDTO} from 'src/Infrastructure/Common/DTO/IdDTO';

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
  public async index(@Param() dto: IdDTO, @Body() projectDto: ProjectDTO) {
    try {
      const {id} = dto;
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
