import {FormErrors} from 'redux-form';
import i18n from '../../../../../i18n';
import {REQUIRED_FIELD} from '../../../../core/constants/validators';
import {TaskFormData} from '../TaskForm';

export const validate = (payload: TaskFormData): FormErrors<TaskFormData> => {
  const errors: FormErrors<TaskFormData> = {};

  if (!payload.name) {
    errors.name = i18n.t(REQUIRED_FIELD);
  }

  return errors;
};
