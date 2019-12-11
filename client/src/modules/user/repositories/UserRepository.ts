import {client as axios} from '../../../utils/axios';
import {User} from '../models/User';

export class UserRepository {
  public static async findUsers(): Promise<User[]> {
    const response = await axios.get('users');
    const users: User[] = [];

    for (const {id, firstName, lastName, email} of response.data) {
      users.push(new User(id, firstName, lastName, email));
    }

    return users;
  }
}
