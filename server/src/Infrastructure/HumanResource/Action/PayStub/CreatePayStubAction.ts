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
  ApiUseTags,
  ApiBearerAuth,
  ApiOperation,
  ApiImplicitFile,
  ApiConsumes
} from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express';
import {AuthGuard} from '@nestjs/passport';
import {ICommandBus} from 'src/Application/ICommandBus';
import {PayStubDTO} from '../../DTO/PayStubDTO';
import {IUploadedFile} from 'src/Domain/File/IUploadedFile';
import {PDFValidator} from 'src/Domain/File/Validator/PDFValidator';
import {UploadFileCommand} from 'src/Application/File/Command/UploadFileCommand';
import {CreatePayStubCommand} from 'src/Application/HumanResource/PayStub/CreatePayStubCommand';
import {UserRole} from 'src/Domain/User/User.entity';
import {RolesGuard} from 'src/Infrastructure/User/Security/RolesGuard';
import {Roles} from 'src/Infrastructure/User/Decorator/Roles';

@Controller('pay_stubs')
@ApiUseTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreatePayStubAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.COOPERATOR, UserRole.ACCOUNTANT)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({title: 'Create new paystub'})
  @ApiImplicitFile({name: 'file', required: true})
  public async index(
    @UploadedFile() file: IUploadedFile,
    @Body() dto: PayStubDTO
  ) {
    if (false === PDFValidator.isValid(file)) {
      throw new BadRequestException('file.erros.invalid_pdf');
    }

    try {
      const fileId = await this.commandBus.execute(new UploadFileCommand(file));
      const id = await this.commandBus.execute(
        new CreatePayStubCommand(dto.date, dto.userId, fileId)
      );

      return {id};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
