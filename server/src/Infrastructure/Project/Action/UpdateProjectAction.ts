import {
  Body,
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Put,
  Param
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { UpdateProjectCommand } from 'src/Application/Project/Command/UpdateProjectCommand';
import { ProjectDTO } from '../DTO/ProjectDTO';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';

@Controller('projects')
@ApiTags('Project')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class UpdateProjectAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Put(':id')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Update project' })
  public async index(@Param() { id }: IdDTO, @Body() projectDto: ProjectDTO) {
    try {
      const { name, dayDuration, customerId, invoiceUnit } = projectDto;

      await this.commandBus.execute(
        new UpdateProjectCommand(id, name, dayDuration, invoiceUnit, customerId)
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
