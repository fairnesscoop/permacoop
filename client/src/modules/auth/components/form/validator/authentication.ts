import {IAuthenticationForm} from '../../../types/authentication';
import {FormErrors} from 'redux-form';
import i18n from '../../../../../i18n';
import {
  INVALID_EMAIL,
  REQUIRED_FIELD
} from '../../../../core/constants/validators';
import {isEmail} from '../../../../core/components/form/validator';

export const validate = (payload: any): FormErrors<IAuthenticationForm> => {
  const errors: FormErrors<IAuthenticationForm> = {};

  if (!payload.email) {
    errors.email = i18n.t(REQUIRED_FIELD);
  } else if (!isEmail(payload.email)) {
    errors.email = i18n.t(INVALID_EMAIL);
  }

  if (!payload.password) {
    errors.password = i18n.t(REQUIRED_FIELD);
  }

  return errors;
};
