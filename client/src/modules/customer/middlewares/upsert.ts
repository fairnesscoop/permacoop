import {Dispatch} from 'redux';
import {loading, errors, success} from '../../core/actions/upsert';
import {errorNormalizer} from '../../../normalizer/errors';
import {CustomerRepository} from '../repositories/CustomerRepository';
import {Customer} from '../models/Customer';

export const upsertCustomer = (payload: Customer) => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(loading(true));

  try {
    dispatch(success(await CustomerRepository.save(payload)));
  } catch (e) {
    dispatch(errors(errorNormalizer(e)));
  } finally {
    dispatch(loading(false));
  }
};
