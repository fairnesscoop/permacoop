import {client as axios} from '../../../utils/axios';
import {UserFormData} from '../components/form/UserForm';
import {IUser} from '../models/IUser';

export const findUsers = async (): Promise<IUser[]> => {
  const {data} = await axios.get('users');

  return data;
};

export const findCurrentUser = async (): Promise<IUser> => {
  const {data} = await axios.get('users/me');

  return data;
};

export const saveUser = async (payload: UserFormData): Promise<IUser> => {
  let response = null;

  if (payload.id) {
    response = await axios.put('users/me', payload);
  } else {
    response = await axios.post('users', payload);
  }

  return response.data;
};
