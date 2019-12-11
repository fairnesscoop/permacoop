import {FormErrors} from 'redux-form';
import i18n from '../../../../../i18n';
import {REQUIRED_FIELD} from '../../../../core/constants/validators';

interface IValidation {
  name: string;
}

export const validate = (payload: any): FormErrors<IValidation> => {
  const errors: FormErrors<IValidation> = {};

  if (!payload.name) {
    errors.name = i18n.t(REQUIRED_FIELD);
  }

  return errors;
};
