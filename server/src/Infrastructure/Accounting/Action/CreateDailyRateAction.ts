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
import {CreateDailyRateCommand} from 'src/Application/Accounting/Command/DailyRate/CreateDailyRateCommand';
import {DailyRateDTO} from '../DTO/DailyRateDTO';
import {Roles} from 'src/Infrastructure/User/Decorator/Roles';
import {RolesGuard} from 'src/Infrastructure/User/Security/RolesGuard';
import {UserRole} from 'src/Domain/User/User.entity';

@Controller('daily_rates')
@ApiUseTags('Accounting')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateDailyRateAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
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
