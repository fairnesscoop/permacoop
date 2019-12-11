import {Dispatch} from 'redux';
import {loading, errors, success} from '../../core/actions/list';
import {errorNormalizer} from '../../../normalizer/errors';
import {CustomerRepository} from '../repositories/CustomerRepository';

export const listCustomers = () => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(loading(true));

  try {
    dispatch(success(await CustomerRepository.findCustomers()));
  } catch (e) {
    dispatch(errors(errorNormalizer(e)));
  } finally {
    dispatch(loading(false));
  }
};
