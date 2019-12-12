import {LoggedUser} from '../models/LoggedUser';

export class LoggedUserFactory {
  public static create(payload: any): LoggedUser {
    return new LoggedUser(payload.firstName, payload.lastName, payload.email);
  }
}
