import {client as axios} from '../../../utils/axios';
import {LoggedUser} from '../models/LoggedUser';
import {TokenStorage} from '../../../utils/tokenStorage';
import {LoggedUserFactory} from '../factory/LoggedUserFactory';
import {AuthenticationFormData} from '../components/form/AuthenticationForm';

export const login = async (
  payload: AuthenticationFormData
): Promise<LoggedUser> => {
  const response = await axios.post('login', payload);
  const {data} = response;
  TokenStorage.save(data.apiToken);

  return LoggedUserFactory.create(data);
};
