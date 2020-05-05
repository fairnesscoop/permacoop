import {
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  Get,
  Param,
  ForbiddenException,
  Res
} from '@nestjs/common';
import {PassThrough} from 'stream';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {IdDTO} from 'src/Infrastructure/Common/DTO/IdDTO';
import {LoggedUser} from '../../User/Decorator/LoggedUser';
import {IQueryBus} from 'src/Application/IQueryBus';
import {DownloadFileQuery} from 'src/Application/File/Command/DownloadFileQuery';
import {GetPaySlipByIdQuery} from 'src/Application/HumanResource/PaySlip/Query/GetPaySlipByIdQuery';
import {PaySlipView} from 'src/Application/HumanResource/PaySlip/View/PaySlipView';
import {DownloadedFileView} from 'src/Application/File/View/DownloadedFileView';

@Controller('pay_slips')
@ApiUseTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class DownloadPaySlipAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id/download')
  @ApiOperation({title: 'Download payslip'})
  public async index(
    @Param() dto: IdDTO,
    @LoggedUser() loggedUser: User,
    @Res() res
  ) {
    try {
      const {user, file}: PaySlipView = await this.queryBus.execute(
        new GetPaySlipByIdQuery(dto.id)
      );

      if (user.id !== loggedUser.getId()) {
        throw new ForbiddenException();
      }

      const {
        buffer,
        originalName,
        mimeType
      }: DownloadedFileView = await this.queryBus.execute(
        new DownloadFileQuery(file.id)
      );

      res.set('Content-disposition', `attachment; filename=${originalName}`);
      res.set('Content-Type', mimeType);
      res.set('Content-Length', buffer.length);

      const stream = new PassThrough();
      stream.end(buffer);
      stream.pipe(res);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
