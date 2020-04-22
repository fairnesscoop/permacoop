import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {ICommandBus} from 'src/Application/ICommandBus';
import {CreateProjectCommand} from 'src/Application/Project/Command/CreateProjectCommand';
import {ProjectDTO} from '../DTO/ProjectDTO';

@Controller('projects')
@ApiUseTags('Project')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class CreateProjectAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @ApiOperation({title: 'Create new project'})
  public async index(@Body() projectDto: ProjectDTO) {
    try {
      const {name, customerId} = projectDto;
      const id = await this.commandBus.execute(
        new CreateProjectCommand(name, customerId)
      );

      return {id};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
