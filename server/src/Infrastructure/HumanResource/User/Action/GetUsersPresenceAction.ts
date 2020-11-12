import { Controller, Inject, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GetUsersPresenceQuery } from 'src/Application/HumanResource/User/Query/GetUsersPresenceQuery';
import { UserPresenceView } from 'src/Application/HumanResource/User/View/UserPresenceView';
import { IQueryBus } from 'src/Application/IQueryBus';

@Controller('users')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetUsersPresenceAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get('presence')
  @ApiOperation({summary: 'Who\'s there or not today?'})
  public async index(): Promise<UserPresenceView[]> {
    return await this.queryBus.execute(new GetUsersPresenceQuery());
  }
}
