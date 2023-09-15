import {
  Controller,
  Get,
  Render
} from '@nestjs/common';

@Controller('')
export class HomeController {

  @Get()
  @Render('home')
  public root() {
    return { who: 'world' };
  }
}
