import {client as axios} from '../../../utils/axios';
import {LoggedUser} from '../models/LoggedUser';
import {TokenStorage} from '../../../utils/tokenStorage';
import {IAuthenticationForm} from '../types/authentication';
import {LoggedUserFactory} from '../factory/LoggedUserFactory';

export const login = async (
  payload: IAuthenticationForm
): Promise<LoggedUser> => {
  const response = await axios.post('login', payload);
  const {data} = response;

  TokenStorage.save(data.apiToken);

  return LoggedUserFactory.create(data);
};
