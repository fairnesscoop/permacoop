import { Controller, Inject, Get, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserView } from 'src/Application/HumanResource/User/View/UserView';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetUsersElementsQuery } from 'src/Application/HumanResource/Payslip/Query/GetUsersElementsQuery';

@Controller('payslips')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetUsersElementsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get elements for payslips' })
  public async index(): Promise<UserView[]> {
    return await this.queryBus.execute(new GetUsersElementsQuery(new Date()));
  }
}
