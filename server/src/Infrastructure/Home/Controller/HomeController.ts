import { Controller, Get, Render, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { RouteNameResolver } from 'src/Infrastructure/Common/ExtendedRouting/RouteNameResolver';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';

@Controller()
@UseGuards(IsAuthenticatedGuard)
export class HomeController {
  constructor(private readonly resolver: RouteNameResolver) {}

  @Get('app')
  @WithName('home')
  @Render('pages/home.njk')
  public get() {
    return {};
  }

  @Get()
  public index(@Res() res: Response) {
    res.redirect(303, this.resolver.resolve('home'));
  }
}
