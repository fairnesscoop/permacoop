import {
  Get,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetUsersSavingsRecordsBalanceQuery } from 'src/Application/HumanResource/Savings/Query/GetUsersSavingsRecordsBalanceQuery';

@Controller('users/savings-records')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetUsersSavingsRecordsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get users savings records balance' })
  public async index() {
    try {
      return await this.queryBus.execute(
        new GetUsersSavingsRecordsBalanceQuery()
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
