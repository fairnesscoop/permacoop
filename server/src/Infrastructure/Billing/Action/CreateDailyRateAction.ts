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
import {CreateDailyRateCommand} from 'src/Application/Billing/Command/DailyRate/CreateDailyRateCommand';
import {DailyRateDTO} from './DTO/DailyRateDTO';

@Controller('daily_rates')
@ApiUseTags('Billing')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class CreateDailyRateAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @ApiOperation({title: 'Create new daily rate'})
  public async index(@Body() dto: DailyRateDTO) {
    try {
      const {userId, customerId, taskId, amount} = dto;
      const id = await this.commandBus.execute(
        new CreateDailyRateCommand(amount, userId, customerId, taskId)
      );

      return {id};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
