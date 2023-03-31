import { Controller, Inject, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { GetPendingLeaveRequestsCountQuery } from 'src/Application/HumanResource/Leave/Query/GetPendingLeaveRequestsCountQuery';

@Controller('leave-requests/pending-count')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetPendingLeaveRequestsCountAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get count of pending leave requests' })
  public async index(): Promise<number> {
    return await this.queryBus.execute(new GetPendingLeaveRequestsCountQuery());
  }
}
