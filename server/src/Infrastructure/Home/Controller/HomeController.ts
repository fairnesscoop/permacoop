import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';

@Controller('')
@UseGuards(IsAuthenticatedGuard)
export class HomeController {
  @Get()
  @WithName('home')
  @Render('pages/home')
  public get() {
    return {};
  }
}
