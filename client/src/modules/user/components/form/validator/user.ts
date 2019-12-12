import {FormErrors} from 'redux-form';
import i18n from '../../../../../i18n';
import {
  REQUIRED_FIELD,
  INVALID_EMAIL,
  PASSWORDS_NOT_MATCH
} from '../../../../core/constants/validators';
import {UserFormData} from '../UserForm';
import {isEmail} from '../../../../core/components/form/validator';

export const validate = (payload: UserFormData): FormErrors<UserFormData> => {
  const errors: FormErrors<UserFormData> = {};

  if (!payload.firstName) {
    errors.firstName = i18n.t(REQUIRED_FIELD);
  }

  if (!payload.lastName) {
    errors.lastName = i18n.t(REQUIRED_FIELD);
  }

  if (!payload.email) {
    errors.email = i18n.t(REQUIRED_FIELD);
  }

  if (payload.email && !isEmail(payload.email)) {
    errors.email = i18n.t(INVALID_EMAIL);
  }

  if (!payload.password) {
    errors.password = i18n.t(REQUIRED_FIELD);
  }

  if (!payload.confirmPassword) {
    errors.confirmPassword = i18n.t(REQUIRED_FIELD);
  }

  if (
    payload.password &&
    payload.confirmPassword &&
    payload.password !== payload.confirmPassword
  ) {
    errors.confirmPassword = i18n.t(PASSWORDS_NOT_MATCH);
  }

  return errors;
};
