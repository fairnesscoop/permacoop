import {Error} from '../modules/common/models/Error';
import i18n from '../i18n';

const errorFormater = (e: any): Error[] => {
  let message = e.message;

  if (e.response) {
    message = e.response.data.message ?? e.response.data.error;
  }

  if (Array.isArray(message)) {
    const errors: Error[] = [];

    for (const msg of message) {
      for (const constraint of Object.values(msg.constraints)) {
        errors.push(new Error(i18n.t(constraint as string)));
      }
    }

    return errors;
  }

  return [new Error(i18n.t(message))];
};

export default errorFormater;
