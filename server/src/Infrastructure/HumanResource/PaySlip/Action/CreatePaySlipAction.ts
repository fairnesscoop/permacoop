import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ICommandBus } from 'src/Application/ICommandBus';
import { PaySlipDTO } from '../DTO/PaySlipDTO';
import { IUploadedFile } from 'src/Domain/File/IUploadedFile';
import { PDFValidator } from 'src/Domain/File/Validator/PDFValidator';
import { UploadFileCommand } from 'src/Application/File/Command/UploadFileCommand';
import { CreatePaySlipCommand } from 'src/Application/HumanResource/PaySlip/Command/CreatePaySlipCommand';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';

@Controller('pay_slips')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreatePaySlipAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.COOPERATOR, UserRole.ACCOUNTANT)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create new payslip' })
  public async index(
    @Body() dto: PaySlipDTO,
    @UploadedFile() file: IUploadedFile
  ) {
    if (!file || false === PDFValidator.isValid(file)) {
      throw new BadRequestException('file.erros.invalid_pdf');
    }

    try {
      const fileId = await this.commandBus.execute(new UploadFileCommand(file));
      const id = await this.commandBus.execute(
        new CreatePaySlipCommand(dto.date, dto.userId, fileId)
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
