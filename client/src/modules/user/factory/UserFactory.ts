import {User} from '../models/User';

export class UserFactory {
  public static create(payload: any): User {
    return new User(
      payload.id,
      payload.firstName,
      payload.lastName,
      payload.email
    );
  }
}
