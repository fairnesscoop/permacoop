import {Controller, Inject, UseGuards, Get} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {IQueryBus} from 'src/Application/IQueryBus';
import {PayStubView} from 'src/Application/HumanResource/PayStub/View/PayStubView';
import {GetPayStubsQuery} from 'src/Application/HumanResource/PayStub/Query/GetPayStubsQuery';

@Controller('pay_stubs')
@ApiUseTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetPayStubsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @ApiOperation({title: 'Get all pay stubs'})
  public async index(): Promise<PayStubView[]> {
    return await this.queryBus.execute(new GetPayStubsQuery());
  }
}
