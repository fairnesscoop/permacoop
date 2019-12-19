import {FormErrors} from 'redux-form';
import i18n from '../../../../../i18n';
import {ActivityFormData} from '../ActivityForm';
import {REQUIRED_FIELD} from '../../../../core/constants/validators';

export const validate = (
  payload: ActivityFormData
): FormErrors<ActivityFormData> => {
  const errors: FormErrors<ActivityFormData> = {};

  if (!payload.date) {
    errors.date = i18n.t(REQUIRED_FIELD);
  }

  if (!payload.time) {
    errors.time = i18n.t(REQUIRED_FIELD);
  }

  if (!payload.projectId) {
    errors.projectId = i18n.t(REQUIRED_FIELD);
  }

  if (!payload.taskId) {
    errors.taskId = i18n.t(REQUIRED_FIELD);
  }

  return errors;
};
