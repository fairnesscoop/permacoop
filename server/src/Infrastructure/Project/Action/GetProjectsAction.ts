import {Controller, Inject, UseGuards, Get, Query} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {ProjectView} from 'src/Application/Project/View/ProjectView';
import {IQueryBus} from 'src/Application/IQueryBus';
import {GetProjectsQuery} from 'src/Application/Project/Query/GetProjectsQuery';
import {FiltersDTO} from '../DTO/FiltersDTO';
import {Roles} from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {RolesGuard} from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import {Pagination} from 'src/Application/Common/Pagination';

@Controller('projects')
@ApiTags('Project')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetProjectsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({summary: 'Get all projects ordered by customer'})
  public async index(
    @Query() filters: FiltersDTO
  ): Promise<Pagination<ProjectView>> {
    return await this.queryBus.execute(
      new GetProjectsQuery(Number(filters.page), filters.customerId)
    );
  }
}
