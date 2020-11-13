import {
    Controller,
    Inject,
    UseGuards,
    Get,
    Param,
    NotFoundException
  } from '@nestjs/common';
  import {AuthGuard} from '@nestjs/passport';
  import {ApiTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
  import {LeaveRequestView} from 'src/Application/HumanResource/Leave/View/LeaveRequestView';
  import {IQueryBus} from 'src/Application/IQueryBus';
  import {IdDTO} from 'src/Infrastructure/Common/DTO/IdDTO';
  import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
  import {Roles} from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
  import {RolesGuard} from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { GetLeaveRequestByIdQuery } from 'src/Application/HumanResource/Leave/Query/GetLeaveRequestByIdQuery';

  @Controller('leave-requests')
  @ApiTags('Human Resource')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'), RolesGuard)
  export class GetLeaveRequestAction {
    constructor(
      @Inject('IQueryBus')
      private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
    @ApiOperation({summary: 'Get leave request'})
    public async index(@Param() dto: IdDTO): Promise<LeaveRequestView> {
      try {
        return await this.queryBus.execute(new GetLeaveRequestByIdQuery(dto.id));
      } catch (e) {
        throw new NotFoundException(e.message);
      }
    }
  }
