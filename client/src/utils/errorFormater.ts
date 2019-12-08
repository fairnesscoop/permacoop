import {Error} from '../modules/common/models/Error';

const errorFormater = (exception: any): Error[] => {
  const message = exception.message;
  if (Array.isArray(message)) {
    const errors: Error[] = [];

    for (const msg of message) {
      for (const constraint of Object.values(msg.constraints)) {
        errors.push(new Error(constraint as string));
      }
    }

    return errors;
  }

  return [new Error(message)];
};

export default errorFormater;
