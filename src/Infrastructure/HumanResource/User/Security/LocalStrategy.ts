import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { AuthenticatedView } from 'src/Application/HumanResource/User/View/AuthenticatedView';
import { IQueryBus } from '@nestjs/cqrs';
import { LoginQuery } from 'src/Application/HumanResource/User/Query/LoginQuery';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {
    super({
      usernameField: 'email'
    });
  }

  public async validate(
    email: string,
    password: string
  ): Promise<AuthenticatedView> {
    try {
      return await this.queryBus.execute(new LoginQuery(email, password));
    } catch (err) {
      throw new UnauthorizedException('login-error-failed');
    }
  }
}
