import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthenticatedView } from 'src/Application/HumanResource/User/View/AuthenticatedView';

@Injectable()
export class UserSerializer extends PassportSerializer {
  serializeUser(user: AuthenticatedView, done: Function) {
    done(null, user);
  }

  public deserializeUser(user: AuthenticatedView, done: Function): void {
    done(null, user);
  }
}
