import { Controller, Inject, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { User, UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { LeavesSummaryView } from 'src/Application/HumanResource/LeavesSummary/View/LeavesSummaryView';
import { GetYearlyLeavesSummaryQuery } from 'src/Application/HumanResource/LeavesSummary/Query/GetYearlyLeavesSummaryQuery';
import { Pagination } from 'src/Application/Common/Pagination';
import { LoggedUser } from '../../User/Decorator/LoggedUser';

@Controller('leaves-summary')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetYearlyLeavesSummaryAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get yearly leaves summary' })
  public async index(
    @LoggedUser() user: User
  ): Promise<Pagination<LeavesSummaryView>> {
    return await this.queryBus.execute(
      new GetYearlyLeavesSummaryQuery(user.getId(), null)
    );
  }
}
