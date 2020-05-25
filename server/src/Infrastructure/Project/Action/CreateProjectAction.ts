import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {ICommandBus} from 'src/Application/ICommandBus';
import {CreateProjectCommand} from 'src/Application/Project/Command/CreateProjectCommand';
import {ProjectDTO} from '../DTO/ProjectDTO';
import {Roles} from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {RolesGuard} from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';

@Controller('projects')
@ApiTags('Project')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateProjectAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({summary: 'Create new project'})
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
