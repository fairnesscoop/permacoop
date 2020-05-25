import {Controller, Inject, UseGuards, Get, Query} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {TaskView} from 'src/Application/Task/View/TaskView';
import {GetTasksQuery} from 'src/Application/Task/Query/GetTasksQuery';
import {IQueryBus} from 'src/Application/IQueryBus';
import {Roles} from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {RolesGuard} from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import {PaginationDTO} from 'src/Infrastructure/Common/DTO/PaginationDTO';
import {Pagination} from 'src/Application/Common/Pagination';

@Controller('tasks')
@ApiTags('Task')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetTasksAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({summary: 'Get all tasks'})
  public async index(
    @Query() pagination: PaginationDTO
  ): Promise<Pagination<TaskView>> {
    return await this.queryBus.execute(
      new GetTasksQuery(Number(pagination.page))
    );
  }
}
