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

export const saveUser = async (
  payload: UserFormData,
  id?: string
): Promise<User> => {
  let response;

  if (id) {
    response = await axios.put(`users/${id}`, payload);
  } else {
    response = await axios.post('users', payload);
  }

  return UserFactory.create(response.data);
};
