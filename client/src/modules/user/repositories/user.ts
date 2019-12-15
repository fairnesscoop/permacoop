import {client as axios} from '../../../utils/axios';
import {User} from '../models/User';
import {UserFactory} from '../factory/UserFactory';
import {UserFormData} from '../components/form/UserForm';

export const findUsers = async (): Promise<User[]> => {
  const response = await axios.get('users');
  const users: User[] = [];

  for (const data of response.data) {
    users.push(UserFactory.create(data));
  }

  return users;
};

export const findCurrentUser = async (): Promise<User> => {
  const {data} = await axios.get('users/me');

  return UserFactory.create(data);
};

export const saveUser = async (payload: UserFormData): Promise<User> => {
  let response = null;

  if (payload.id) {
    response = await axios.put('users/me', payload);
  } else {
    response = await axios.post('users', payload);
  }

  return UserFactory.create(response.data);
};
