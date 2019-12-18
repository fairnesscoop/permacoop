import {Dispatch} from 'redux';
import {loading, errors, success} from '../../core/actions/list';
import {findCustomers} from '../repositories/customer';

export const listCustomers = () => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(loading(true));

  try {
    dispatch(success(await findCustomers()));
  } catch (e) {
    dispatch(errors(e));
  } finally {
    dispatch(loading(false));
  }
};
