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
import {IQueryBus} from 'src/Application/IQueryBus';
import {IdDTO} from 'src/Infrastructure/Common/DTO/IdDTO';
import {Roles} from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import {RolesGuard} from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';

@Controller('projects')
@ApiUseTags('Project')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetProjectAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({title: 'Get project'})
  public async index(@Param() dto: IdDTO): Promise<ProjectView> {
    try {
      return await this.queryBus.execute(new GetProjectByIdQuery(dto.id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
