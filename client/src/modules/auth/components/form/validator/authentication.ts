import {FormErrors} from 'redux-form';
import i18n from '../../../../../i18n';
import {
  INVALID_EMAIL,
  REQUIRED_FIELD
} from '../../../../core/constants/validators';
import {isEmail} from '../../../../core/components/form/validator';
import {AuthenticationFormData} from '../AuthenticationForm';

export const validate = (payload: any): FormErrors<AuthenticationFormData> => {
  const errors: FormErrors<AuthenticationFormData> = {};

  if (!payload.email) {
    errors.email = i18n.t(REQUIRED_FIELD);
  }

  if (payload.email && !isEmail(payload.email)) {
    errors.email = i18n.t(INVALID_EMAIL);
  }

  if (!payload.password) {
    errors.password = i18n.t(REQUIRED_FIELD);
  }

  return errors;
};
