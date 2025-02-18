import {
  Controller,
  Get,
  Inject,
  Render,
  Res,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GetPendingLeaveRequestsCountQuery } from 'src/Application/HumanResource/Leave/Query/GetPendingLeaveRequestsCountQuery';
import { IQueryBus } from 'src/Application/IQueryBus';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';

@ApiTags('Home')
@Controller()
@UseGuards(IsAuthenticatedGuard)
export class HomeController {
  constructor(
    private readonly resolver: RouteNameResolver,
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get('app')
  @WithName('home')
  @Render('pages/home.njk')
  public async get() {
    const pendingLeaves = await this.queryBus.execute(
      new GetPendingLeaveRequestsCountQuery()
    );

    return { pendingLeaves };
  }

  @Get()
  @WithName('index')
  public index(@Res() res: Response) {
    res.redirect(303, this.resolver.resolve('home'));
  }
}
