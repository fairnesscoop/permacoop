import {Controller, Inject, UseGuards, Get} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {IQueryBus} from 'src/Application/IQueryBus';
import {DailyRateView} from 'src/Application/Accounting/View/DailyRate/DailyRateView';
import {GetQuotesQuery} from 'src/Application/Accounting/Query/Quote/GetQuotesQuery';

@Controller('quotes')
@ApiUseTags('Accounting')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetQuotesAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @ApiOperation({title: 'Get all quotes'})
  public async index(): Promise<DailyRateView[]> {
    return await this.queryBus.execute(new GetQuotesQuery());
  }
}
