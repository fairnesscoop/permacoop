import {Controller, Inject, UseGuards, Get} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {IQueryBus} from 'src/Application/IQueryBus';
import {DailyRateView} from 'src/Application/Accounting/View/DailyRate/DailyRateView';
import {GetQuotesQuery} from 'src/Application/Accounting/Query/Quote/GetQuotesQuery';
import {Roles} from 'src/Infrastructure/User/Decorator/Roles';
import {UserRole} from 'src/Domain/User/User.entity';
import {RolesGuard} from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('quotes')
@ApiUseTags('Accounting')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetQuotesAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({title: 'Get all quotes'})
  public async index(): Promise<DailyRateView[]> {
    return await this.queryBus.execute(new GetQuotesQuery());
  }
}
