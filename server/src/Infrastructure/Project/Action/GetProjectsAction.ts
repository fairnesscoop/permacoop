import {Controller, Inject, UseGuards, Get, Query} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {ProjectView} from 'src/Application/Project/View/ProjectView';
import {IQueryBus} from 'src/Application/IQueryBus';
import {GetProjectsQuery} from 'src/Application/Project/Query/GetProjectsQuery';
import {FiltersDTO} from '../DTO/FiltersDTO';
import {Roles} from 'src/Infrastructure/User/Decorator/Roles';
import {UserRole} from 'src/Domain/User/User.entity';
import {RolesGuard} from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('projects')
@ApiUseTags('Project')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetProjectsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({title: 'Get all projects ordered by customer'})
  public async index(@Query() filters: FiltersDTO): Promise<ProjectView[]> {
    return await this.queryBus.execute(
      new GetProjectsQuery(filters.customerId)
    );
  }
}
