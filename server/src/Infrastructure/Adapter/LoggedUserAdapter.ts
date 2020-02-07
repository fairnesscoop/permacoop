import {Inject, Injectable, Scope} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import {ILoggedUser} from '../../Application/Adapter/ILoggedUser';

@Injectable({scope: Scope.REQUEST})
export class LoggedUserAdapter implements ILoggedUser {
  constructor(@Inject(REQUEST) private readonly request) {}

  public async get(): Promise<any> {
    console.log(this.request);
  }
}
