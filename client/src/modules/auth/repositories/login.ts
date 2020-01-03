import {client as axios} from '../../../utils/axios';
import {ILoggedUser} from '../models/ILoggedUser';
import {TokenStorage} from '../../../utils/tokenStorage';
import {AuthenticationFormData} from '../components/form/AuthenticationForm';

export const login = async (
  payload: AuthenticationFormData
): Promise<ILoggedUser> => {
  const response = await axios.post('login', payload);
  const {data} = response;
  TokenStorage.save(data.apiToken);

  return data;
};
