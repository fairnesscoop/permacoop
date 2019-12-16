import {
  Controller,
  Inject,
  Post,
  Body,
  UnauthorizedException
} from '@nestjs/common';
import {ApiUseTags, ApiOperation} from '@nestjs/swagger';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';
import {LoginQuery} from 'src/Application/User/Query/LoginQuery';
import {AuthenticatedView} from 'src/Application/User/View/AuthenticatedView';
import {LoginDTO} from './DTO/LoginDTO';

@Controller('login')
@ApiUseTags('User')
export class LoginAction {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter
  ) {}

  @Post()
  @ApiOperation({title: 'User authentication'})
  public async index(@Body() loginDto: LoginDTO): Promise<AuthenticatedView> {
    try {
      return await this.queryBus.execute(
        new LoginQuery(loginDto.email, loginDto.password)
      );
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
