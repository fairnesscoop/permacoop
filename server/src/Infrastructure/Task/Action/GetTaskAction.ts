import {
  Controller,
  Inject,
  UseGuards,
  Get,
  Param,
  NotFoundException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TaskView } from 'src/Application/Task/View/TaskView';
import { GetTaskByIdQuery } from 'src/Application/Task/Query/GetTaskByIdQuery';
import { IQueryBus } from 'src/Application/IQueryBus';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';

@Controller('tasks')
@ApiTags('Task')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetTaskAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id')
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get task' })
  public async index(@Param() dto: IdDTO): Promise<TaskView> {
    try {
      return await this.queryBus.execute(new GetTaskByIdQuery(dto.id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
