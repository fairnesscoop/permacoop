import {client as axios} from '../../../utils/axios';
import {LoggedUser} from '../models/LoggedUser';
import {TokenStorage} from '../../../utils/tokenStorage';
import {IAuthenticationForm} from '../types/authentication';

export class LoginRepository {
  public static async login(payload: IAuthenticationForm): Promise<LoggedUser> {
    const response = await axios.post('login', payload);
    const {firstName, lastName, email, apiToken} = response.data;

    TokenStorage.save(apiToken);

    return new LoggedUser(firstName, lastName, email);
  }
}
