import {Dispatch} from 'redux';
import {AppState} from '../../../store/reducers';
import {loading, errors, success} from '../actions/list';
import errorFormater from '../../../utils/errorFormater';
import {User} from '../models/User';

export const listUsers = () => async (
  dispatch: Dispatch,
  state: AppState,
  axios: any
): Promise<void> => {
  dispatch(loading(true));

  try {
    const response = await axios.get('users');
    const users: User[] = [];

    for (const {id, firstName, lastName, email} of response.data) {
      users.push(new User(id, firstName, lastName, email));
    }

    dispatch(success(users));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(false));
  }
};
