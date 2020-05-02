import {
  Controller,
  Inject,
  Post,
  Body,
  UnauthorizedException
} from '@nestjs/common';
import {ApiUseTags, ApiOperation} from '@nestjs/swagger';
import {IQueryBus} from 'src/Application/IQueryBus';
import {LoginQuery} from 'src/Application/HumanResource/User/Query/LoginQuery';
import {AuthenticatedView} from 'src/Application/HumanResource/User/View/AuthenticatedView';
import {LoginDTO} from '../DTO/LoginDTO';

@Controller('login')
@ApiUseTags('Human Resource')
export class LoginAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
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
