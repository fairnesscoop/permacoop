import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/NestJS/Routing/WithName';

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
