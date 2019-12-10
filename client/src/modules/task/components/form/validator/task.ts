import {FormErrors} from 'redux-form';
import i18n from '../../../../../i18n';
import {REQUIRED_FIELD} from '../../../../common/constants/validators';
import {ITaskUpsertValidation} from '../../../types/upsert';

export const validate = (payload: any): FormErrors<ITaskUpsertValidation> => {
  const errors: FormErrors<ITaskUpsertValidation> = {};

  if (!payload.name) {
    errors.name = i18n.t(REQUIRED_FIELD);
  }

  return errors;
};
