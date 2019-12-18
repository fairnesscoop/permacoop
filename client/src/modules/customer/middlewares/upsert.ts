import {Dispatch} from 'redux';
import {loading, errors, success} from '../../core/actions/upsert';
import {saveCustomer} from '../repositories/customer';
import {CustomerFormData} from '../components/form/CustomerForm';

export const upsertCustomer = (payload: CustomerFormData) => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(loading(true));

  try {
    dispatch(success(await saveCustomer(payload)));
  } catch (e) {
    dispatch(errors(e));
  } finally {
    dispatch(loading(false));
  }
};
