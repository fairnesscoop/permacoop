import {FormErrors} from 'redux-form';
import i18n from '../../../../../i18n';
import {REQUIRED_FIELD} from '../../../../core/constants/validators';

export interface ITaskUpsertValidation {
  name: string;
}

export const validate = (payload: any): FormErrors<ITaskUpsertValidation> => {
  const errors: FormErrors<ITaskUpsertValidation> = {};

  if (!payload.name) {
    errors.name = i18n.t(REQUIRED_FIELD);
  }

  return errors;
};
