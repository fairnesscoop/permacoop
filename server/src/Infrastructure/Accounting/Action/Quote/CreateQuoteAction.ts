import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiUseTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {ICommandBus} from 'src/Application/ICommandBus';
import {LoggedUser} from 'src/Infrastructure/User/Decorator/LoggedUser';
import {User, UserRole} from 'src/Domain/User/User.entity';
import {CreateQuoteCommand} from 'src/Application/Accounting/Command/Quote/CreateQuoteCommand';
import {QuoteDTO} from '../../DTO/QuoteDTO';
import {CreateQuoteItemsCommand} from 'src/Application/Accounting/Command/Quote/CreateQuoteItemsCommand';
import {Roles} from 'src/Infrastructure/User/Decorator/Roles';
import {RolesGuard} from 'src/Infrastructure/User/Security/RolesGuard';

@Controller('quotes')
@ApiUseTags('Accounting')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateQuoteAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({title: 'Create new quote'})
  public async index(@Body() dto: QuoteDTO, @LoggedUser() user: User) {
    try {
      const {projectId, customerId, status, items} = dto;
      const id = await this.commandBus.execute(
        new CreateQuoteCommand(user, status, customerId, projectId)
      );

      await this.commandBus.execute(new CreateQuoteItemsCommand(id, items));

      return {id};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
