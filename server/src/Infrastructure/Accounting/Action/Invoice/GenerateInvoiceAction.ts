import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ICommandBus } from 'src/Application/ICommandBus';
import { LoggedUser } from 'src/Infrastructure/HumanResource/User/Decorator/LoggedUser';
import { User, UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { InvoiceDTO } from '../../DTO/InvoiceDTO';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { GenerateInvoiceCommand } from 'src/Application/Accounting/Command/Invoice/GenerateInvoiceCommand';
import { InvoiceStatus } from 'src/Domain/Accounting/Invoice.entity';

@Controller('invoices')
@ApiTags('Accounting')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GenerateInvoiceAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({summary: 'Generate new invoice'})
  public async index(@Body() { projectId, expireInDays }: InvoiceDTO, @LoggedUser() user: User) {
    try {
      const id = await this.commandBus.execute(
        new GenerateInvoiceCommand(
          projectId,
          InvoiceStatus.DRAFT,
          expireInDays,
          user
        )
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
