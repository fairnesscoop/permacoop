import {Controller, Inject, UseGuards, Get} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {IQueryBus} from 'src/Application/IQueryBus';
import {PaySlipView} from 'src/Application/HumanResource/PaySlip/View/PaySlipView';
import {GetPaySlipsQuery} from 'src/Application/HumanResource/PaySlip/Query/GetPaySlipsQuery';

@Controller('pay_slips')
@ApiUseTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetPaySlipsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @ApiOperation({title: 'Get all pay slips'})
  public async index(): Promise<PaySlipView[]> {
    return await this.queryBus.execute(new GetPaySlipsQuery());
  }
}
