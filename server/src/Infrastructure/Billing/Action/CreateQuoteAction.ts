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
import {User} from 'src/Domain/User/User.entity';
import {CreateQuoteCommand} from 'src/Application/Billing/Command/Quote/CreateQuoteCommand';
import {CreateQuoteDTO} from '../DTO/CreateQuoteDTO';
import {CreateQuoteItemsCommand} from 'src/Application/Billing/Command/Quote/CreateQuoteItemsCommand';

@Controller('quotes')
@ApiUseTags('Billing')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class CreateQuoteAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @ApiOperation({title: 'Create new quote'})
  public async index(
    @Body() quoteDTO: CreateQuoteDTO,
    @LoggedUser() user: User
  ) {
    try {
      const {projectId, customerId, status, items} = quoteDTO;
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
