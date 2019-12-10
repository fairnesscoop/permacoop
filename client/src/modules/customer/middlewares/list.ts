import {Dispatch} from 'redux';
import {AppState} from '../../../store/reducers';
import {loading, errors, success} from '../actions/list';
import {errorNormalizer} from '../../../normalizer/errors';
import {Customer} from '../models/Customer';

export const listCustomers = () => async (
  dispatch: Dispatch,
  state: AppState,
  axios: any
): Promise<void> => {
  dispatch(loading(true));

  try {
    const response = await axios.get('customers');
    const customers: Customer[] = [];

    for (const {id, name} of response.data) {
      customers.push(new Customer(id, name));
    }

    dispatch(success(customers));
  } catch (e) {
    dispatch(errors(errorNormalizer(e)));
  } finally {
    dispatch(loading(false));
  }
};
