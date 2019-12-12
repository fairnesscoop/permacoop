import {FormErrors} from 'redux-form';
import i18n from '../../../../../i18n';
import {REQUIRED_FIELD} from '../../../../core/constants/validators';
import {ProjectFormData} from '../ProjectForm';

export const validate = (
  payload: ProjectFormData
): FormErrors<ProjectFormData> => {
  const errors: FormErrors<ProjectFormData> = {};

  if (!payload.name) {
    errors.name = i18n.t(REQUIRED_FIELD);
  }

  if (!payload.customerId) {
    errors.customerId = i18n.t(REQUIRED_FIELD);
  }

  return errors;
};
