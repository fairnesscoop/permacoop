import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';

@Controller('')
@UseGuards(IsAuthenticatedGuard)
export class HomeController {
  @Get()
  @Render('home')
  public get() {
    return {};
  }
}
