import { Get, Controller, Inject, UseGuards, Res } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { PassThrough } from 'stream';
import { Response } from 'express';
import { PDFService } from '@t00nday/nestjs-pdf';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { IDateUtils } from 'src/Application/IDateUtils';
import { GetPayrollElementsQuery } from 'src/Application/HumanResource/PayrollElements/Query/GetPayrollElementsQuery';

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
    private readonly pdfService: PDFService,
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.ACCOUNTANT)
  @ApiOperation({ summary: 'Download payroll elements' })
  public async index(@Res() res: Response) {
    const elements = await this.queryBus.execute(new GetPayrollElementsQuery());

    console.log(elements);

    const now = new Date();

    const locals = {
      elements,
      now,
      formatMoney,
      dateUtils: this.dateUtils
    };

    const buffer = await this.pdfService
      .toBuffer('PayrollElements', { locals })
      .toPromise();

    const yearMonth = this.dateUtils.format(now, 'y-MM');
    const fileName = `${yearMonth}-elements-paie-fairness.pdf`;

    res.set('Content-Disposition', `attachment; filename=${fileName}`);
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Length', buffer.length.toString());

    const stream = new PassThrough();
    stream.end(buffer);
    stream.pipe(res);
  }
}
