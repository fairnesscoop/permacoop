import { Controller, Inject, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { PaySlipView } from 'src/Application/HumanResource/PaySlip/View/PaySlipView';
import { GetPaySlipsQuery } from 'src/Application/HumanResource/PaySlip/Query/GetPaySlipsQuery';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';
import { Pagination } from 'src/Application/Common/Pagination';

@Controller('pay_slips')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetPaySlipsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all pay slips' })
  public async index(
    @Query() pagination: PaginationDTO
  ): Promise<Pagination<PaySlipView>> {
    return await this.queryBus.execute(new GetPaySlipsQuery(pagination.page));
  }
}
