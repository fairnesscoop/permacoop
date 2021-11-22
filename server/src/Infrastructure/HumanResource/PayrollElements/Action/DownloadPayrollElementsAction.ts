import { Get, Controller, Inject, UseGuards, Res, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { PassThrough } from 'stream';
import { Response } from 'express';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { IDateUtils } from 'src/Application/IDateUtils';
import { IDocxService } from 'src/Application/IDocxService';
import { GetPayrollElementsQuery } from 'src/Application/HumanResource/PayrollElements/Query/GetPayrollElementsQuery';
import { PayrollElementsLocals } from '../DTO/PayrollElementsDTO';

const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

@Controller('payroll_elements')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class DownloadPayrollElementsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    @Inject('IDocxService')
    private readonly docxService: IDocxService,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.ACCOUNTANT)
  @ApiOperation({ summary: 'Download payroll elements' })
  public async index(@Res() res: Response) {
    const elements = await this.queryBus.execute(new GetPayrollElementsQuery());
    const now = new Date();

    const locals: PayrollElementsLocals = {
      elements,
      now,
      formatMoney,
      dateUtils: this.dateUtils
    };

    const yearMonth = this.dateUtils.format(now, 'y-MM');
    const fileStem = `${yearMonth}-elements-paie-fairness`;

    await this.respondDocx(locals, fileStem, res);
  }

  private async respondDocx(
    locals: any,
    fileStem: string,
    res: Response
  ): Promise<void> {
    const buffer = await this.docxService.toBuffer('PayrollElements', locals);

    res.set('Content-Disposition', `attachment; filename=${fileStem}.docx`);
    res.set(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    res.set('Content-Length', buffer.length.toString());

    const stream = new PassThrough();
    stream.end(buffer);
    stream.pipe(res);
  }
}
